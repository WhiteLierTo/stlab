<template>
  <div class="auto-table-container">
    <div class="table-container" ref="tableContainer">
      <el-table :data="tableData">
        <template v-for="(column, colIndex) in tableInfo.columns">
          <el-table-column
            :key="colIndex"
            :prop="column.prop"
            :label="column.label.toString()"
            width="180"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "autoTable",
  props: {
    tableInfo: {
      default: {
        columns: [],
      },
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    computeTableWidthAndReDraw(rows) {
      // 自动计算表格宽度
      // 顺便收集所有的图片
      // TODO: 固定宽度的不要计算宽度了
      // 应该是返回时页面已经切走了
      if (!this.$refs.tableContainer) return;
      this.previewImageList = [];
      let canUseWidth = this.$refs.tableContainer.offsetWidth; // 最大可用宽度;
      let usedWidth = this._computeOtherColWidth();
      let oldWidthMap = this.$utils.gadgets.deepClone(this.widthMap);
      this.widthMap = new Map(); // 在改为使用Map结构之后,不需要Object.entries这样繁琐了,直接使用widthMap.forEach()
      this.tableInfo.columns.forEach((col, index) => {
        let maxPx = Math.max(
          ...rows.map((d, rowIndex) => {
            if (col.type === "action") {
              let displayText = this._formatActionContentToList(
                index,
                d,
                rowIndex
              ).join("&");
              return this._getTextWidthByCanvas(displayText);
            } else if (col.type === "image") {
              this.previewImageList.push(
                this._handleFuncOrOther(col.path, d, rowIndex)
              );
              return (col.imageWidth || 300) + 20;
            } else {
              let displayText = d[`${col.prop}_computed`];
              return this._getTextWidthByCanvas(displayText);
            }
          }),
          this._getTextWidthByCanvas(col.label)
        );
        let textWidth = maxPx + 28;
        if (
          col.presetStyle &&
          col.presetStyle.withPoint &&
          col.presetStyle.withPoint.show
        ) {
          textWidth += 15;
        }
        if (col.minWidth && typeof col.minWidth === "number") {
          textWidth = Math.max(col.minWidth, textWidth);
        }
        if (col.maxWidth && typeof col.maxWidth === "number") {
          textWidth = Math.min(col.maxWidth, textWidth);
        }
        if (col.width && typeof col.width === "number") {
          textWidth = col.width;
        }
        this.widthMap[col.label] = {
          displayWidth: textWidth, // 展示宽度
          minWidth: textWidth, // 最小宽度 用来1. 给最终被定为auto的元素兜底 2. 用来比较新旧布局
          isWrap: false, // 是否换行,用来比较新旧布局
        };
        usedWidth += textWidth;
      });
      // 分配剩余空间
      // TODO 当有col规定了width时,计算有些问题
      if (usedWidth < canUseWidth) {
        let noImageAndWidthRows = this.tableInfo.columns.filter(
          (col) => col.type !== "image" && !col.width
        );
        let oneShare =
          (canUseWidth - usedWidth - 20) / noImageAndWidthRows.length; // 20 大于滚动条宽度17即可
        let imageAndHasWidthLabelsList = this.tableInfo.columns
          .filter((col) => col.type === "image" || col.width)
          .map((col) => col.label);
        Object.keys(this.widthMap).forEach((key) => {
          if (imageAndHasWidthLabelsList.includes(key)) return;
          this.widthMap[key].displayWidth += oneShare;
        });
      } else {
        // 拿出长行
        // TODO  这里若type === image的行进入长行,不可预期
        let longCols = Object.entries(this.widthMap)
          .map(([key, value]) => [key, value])
          .filter((d) => d[1].displayWidth > this.longColWidth);
        longCols.sort((x, y) => x[1].displayWidth > y[1].displayWidth);
        // 超出的宽度
        let overflowWidth = usedWidth - canUseWidth + 20; // magicNumber
        let currentRow;
        while (longCols.length) {
          currentRow = longCols.shift();
          // 在缩短这些长行的display宽度时,同时缩短他们的minWidth
          // 如果剩余的很少 结束循环
          if (
            overflowWidth <= 20 &&
            currentRow[1].displayWidth >= this.longColWidth + overflowWidth
          ) {
            this.widthMap[currentRow[0]].displayWidth =
              this.widthMap[currentRow[0]].displayWidth - overflowWidth;
            this.widthMap[currentRow[0]].minWidth = this.widthMap[
              currentRow[0]
            ].displayWidth;
            this.widthMap[currentRow[0]].isWrap = true;
            overflowWidth = 0;
            break;
          }
          // 取走20px
          if (currentRow[1].displayWidth > this.longColWidth + 20) {
            currentRow[1].displayWidth -= 20;
            overflowWidth -= 20;
            this.widthMap[currentRow[0]].displayWidth -= 20;
            this.widthMap[currentRow[0]].minWidth = this.widthMap[
              currentRow[0]
            ].displayWidth;
            this.widthMap[currentRow[0]].isWrap = true;
            longCols.push(currentRow);
          }
        }
      }
      // 将最长的非image和action列的displayWidth设为auto
      let maxWidthPx = 0;
      let widthObjList = Object.entries(this.widthMap).map(([key, value]) => {
        // value.minWidth = value.displayWidth;
        let currentConfig = this.tableInfo.columns.filter(
          (d) => d.label === key
        )[0];
        if (currentConfig.type !== "image") {
          //  && currentConfig.type !== "action"
          maxWidthPx = Math.max(maxWidthPx, value.displayWidth);
        }
        return [key, value];
      });
      let maxWidthObjIndex = widthObjList.findIndex(
        ([key, value]) => value.displayWidth === maxWidthPx
      );
      if (maxWidthObjIndex !== -1) {
        // shouldDisplayWidth:理应的展示宽度 用来比较布局
        // 如果表格放不下,shouldDisplayWidth就是实际展示宽度
        // 如果表格放得下,shouldDisplayWidth小于实际展示宽度
        widthObjList[maxWidthObjIndex][1].shouldDisplayWidth =
          widthObjList[maxWidthObjIndex][1].displayWidth;
        widthObjList[maxWidthObjIndex][1].displayWidth = "auto";
      }
      widthObjList.forEach(([key, value]) => {
        this.widthMap[key] = value;
      }); // 这一步是不需要的,为了可阅读性,添加于此
      // 开始比较新旧布局
      let isNeedReBuild;
      if (rows.length === 0) {
        // 如果本次为空数据,为了emptyImg的位置,重构,但需要记录,下次有数据时,不能采用本次的widthMap
        isNeedReBuild = true;
        this.isOldRowEmpty = true;
      } else {
        isNeedReBuild =
          this.isOldRowEmpty ||
          widthObjList.some(([key, widthConfig]) => {
            //  应该是第一次构建
            if (!oldWidthMap[key]) return true;
            // 如果在新布局里需要换行,则无所谓在旧布局中是怎样的 不重构
            // 如果在旧布局里需要换行,则无论新布局里需不需要换行,都符合心理预期,此列不重构
            if (widthConfig.isWrap || oldWidthMap[key].isWrap) return false;
            // 如果本次布局的最小宽度大于旧布局的展示宽度,则在旧布局下需要换行,重构
            return (
              widthConfig.minWidth >
              (oldWidthMap[key].displayWidth === "auto"
                ? oldWidthMap[key].shouldDisplayWidth
                : oldWidthMap[key].displayWidth)
            );
          });
        this.isOldRowEmpty = false;
      }
      if (isNeedReBuild) {
        // 需要重构
        this.isShowTable = false;
        this.tableData = rows;
        this.$nextTick(() => {
          this.isShowTable = true;
          if (
            this.canShowSort &&
            this.tableInfo.reSortConfig &&
            this.$utils.gadgets.getPermison(this.permissionMove)
          ) {
            this.$nextTick(this.registerDragEvent);
          }
        });
      } else {
        this.widthMap = this.$utils.gadgets.deepClone(oldWidthMap);
        this.tableData = rows;
        if (
          this.canShowSort &&
          this.tableInfo.reSortConfig &&
          this.$utils.gadgets.getPermison(this.permissionMove)
        ) {
          this.$nextTick(this.registerDragEvent);
        }
      }
      clearTimeout(this.loadingTimer);
      this.isLoading = false;
    },
  },
};
</script>
