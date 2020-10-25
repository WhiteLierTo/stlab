<template>
  <div class="auto-table-container">
    <!-- <div class="table-container" ref="tableContainer">
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
    </div> -->
    <div class="table-container" ref="tableContainer" v-show="isShowTableView">
      <el-table
        :data="tableData"
        stripe
        @selection-change="_handleSelectionChange"
        size="mini"
        class="FH-table"
        :class="{ noSelect: dragInfo.isDragging }"
        @row-click="rowClick"
        @row-dblclick="rowDbClick"
        ref="autoTable"
        height="100%"
        :row-class-name="randomRowClassName"
        v-if="isShowTable"
        v-loading="isLoading"
        @select="onSelect"
        @select-all="onSelectAll"
        :rowKey="rowKey"
        :style="{ minHeight: minHeight || 'none' }"
      >
        <div class="empty" slot="empty">
          <img src="../../assets/images/nodata.png" alt="" />
          <span>没有查询到任何数据</span>
        </div>
        <el-table-column
          type="selection"
          width="45"
          v-if="!securityHides.includes('select')"
          align="center"
          :fixed="!hasCardView"
        ></el-table-column>

        <el-table-column
          width="60"
          align="center"
          v-if="!securityHides.includes('index')"
          label="序号"
        >
          <template slot-scope="scope">
            <span
              v-text="
                pagination.pageSize * (pagination.pageNum - 1) +
                  scope.$index +
                  1
              "
            ></span>
          </template>
        </el-table-column>

        <template v-for="(column, colIndex) in tableInfo.columns">
          <el-table-column
            :key="colIndex"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            :fixed="column.fixed"
            v-if="column.type === 'action'"
          >
            <template slot-scope="scope">
              <div class="row-container">
                <span
                  class="with-point"
                  v-if="getPresetStyle(colIndex, 'withPoint').show"
                  :style="
                    `background:${_handleFuncOrOther(
                      getPresetStyle(colIndex, 'withPoint').backgroundColor,
                      scope.row,
                      scope.$index
                    )}`
                  "
                ></span>

                <span
                  v-for="(actionContent,
                  actonIndex) in _formatActionContentToList(
                    colIndex,
                    scope.row,
                    scope.$index
                  )"
                  :key="actonIndex"
                  v-allow="
                    getActionPermission(column, actonIndex, actionContent)
                  "
                >
                  <el-button
                    v-if="actionContent"
                    type="text"
                    size="small"
                    class="op-bt action-op-bt"
                    v-html="actionContent"
                    @click.stop="
                      handleAction(
                        colIndex,
                        actonIndex,
                        scope.row,
                        scope.$index
                      )
                    "
                    :style="getStyle(scope, colIndex)"
                    :disabled="
                      _handleFuncOrOther(
                        column.disable,
                        scope.row,
                        scope.$index
                      )
                    "
                  ></el-button>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :key="colIndex"
            :prop="column.prop"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            v-else-if="column.type === 'image'"
          >
            <template slot-scope="scope">
              <div
                class="img-container"
                :style="{
                  width: `${widthMap[column.label].displayWidth}px`,
                  height: `${column.imageHeight ||
                    defaultImageConfig.imageHeight}px`,
                }"
              >
                <el-image
                  style="width:100%;height:100%"
                  :src="
                    _handleFuncOrOther(column.path, scope.row, scope.$index)
                  "
                  fit="scale-down"
                  :preview-src-list="previewImageList"
                  @click.native.stop
                  @dblclick.native.stop
                >
                </el-image>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :key="colIndex"
            :prop="column.prop"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            v-else
          >
            <template slot-scope="scope">
              <template
                v-if="
                  modifyRowIndex !== scope.$index || modifyColIndex !== colIndex
                "
              >
                <div class="row-container">
                  <span
                    class="with-point"
                    v-if="getPresetStyle(colIndex, 'withPoint').show"
                    :style="
                      `background:${_handleFuncOrOther(
                        getPresetStyle(colIndex, 'withPoint').backgroundColor,
                        scope.row,
                        scope.$index
                      )}`
                    "
                  ></span>

                  <span
                    v-html="scope.row[`${column.prop}_computed`]"
                    :style="getStyle(scope, colIndex)"
                    @click="
                      modifyInSitu(
                        scope.$index,
                        colIndex,
                        beforeDisplay(
                          scope.row,
                          scope.$index,
                          colIndex,
                          column.prop,
                          false
                        ),
                        $event
                      )
                    "
                    v-if="!tableInfo.columns[colIndex].canModify"
                  >
                  </span>

                  <el-button
                    v-else
                    type="text"
                    size="small"
                    v-html="scope.row[`${column.prop}_computed`]"
                    @click="
                      modifyInSitu(
                        scope.$index,
                        colIndex,
                        beforeDisplay(
                          scope.row,
                          scope.$index,
                          colIndex,
                          column.prop,
                          false
                        ),
                        $event
                      )
                    "
                    :style="getStyle(scope, colIndex)"
                    :disabled="
                      _handleFuncOrOther(
                        column.disable,
                        scope.row,
                        scope.$index
                      )
                    "
                  >
                  </el-button>
                </div>
              </template>

              <template v-else>
                <div class="input-container">
                  <el-input
                    size="mini"
                    v-model.trim="modifyValue"
                    class="input-container-input"
                    @keyup.enter.native="submitModifyInSitu"
                    @click.stop.native
                    ref="modifyInSituInput"
                  ></el-input>
                  <div
                    class="submit-bt-container"
                    @click.stop="submitModifyInSitu"
                  >
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </template>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          label="操作"
          :width="getOperationWidth()"
          v-if="
            Object.values(mergedOperationsConfig).some((config) =>
              Array.isArray(config) ? config.length : config.show
            )
          "
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="op-bt"
              v-if="getOperationConfig('delete', 'show')"
            >
              <el-popconfirm
                title="请确认是否删除该行数据？"
                popper-class="auto-table-pop-container"
                @onConfirm="() => deleteMe(scope.row, scope.$index)"
              >
                <span @click.stop slot="reference">
                  <img
                    :src="getOperationConfig('delete', 'iconPath')"
                    v-if="getOperationConfig('delete', 'iconPath')"
                    class="op-bt-img-icon"
                    alt=""
                  />
                  <i
                    :class="getOperationConfig('delete', 'icon')"
                    v-else-if="getOperationConfig('delete', 'icon')"
                  ></i>
                  {{ getOperationConfig("delete", "label") }}
                </span>
              </el-popconfirm>
            </el-button>

            <el-button
              type="text"
              size="small"
              class="op-bt"
              v-for="(extraBt, index) in mergedOperationsConfig.extra"
              :key="index"
              @click.stop="
                extraBt.onClick && extraBt.onClick(scope.row, scope.$index)
              "
            >
              <img
                :src="extraBt.iconPath"
                v-if="extraBt.iconPath"
                class="op-bt-img-icon"
                alt=""
              />
              <i :class="extraBt.icon" v-else-if="extraBt.icon"></i>
              {{ extraBt.label }}
            </el-button>
          </template>
        </el-table-column>
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
      isShowTable: false,
      isShowTableView: false,
    };
  },
  async mounted(){
    //  if (this.tableInfo.minDisplayRows) {
    //   this.minHeight = `${this.tableInfo.minDisplayRows * 40}px`;
    // }
    // if (this.defaultSearchMap) {
    //   this.searchMap = this.defaultSearchMap;
    // }
    // this.initLoadingTimer = setTimeout(() => {
    //   this.initLoading = true;
    // }, 500);
    // this.$emit("init", this);
    // if (this.tableInfo.isDelay === undefined || !this.tableInfo.isDelay) {
    //   await this.search();
    //   clearTimeout(this.initLoadingTimer);
    //   this.initLoading = false;
    // }
  },
  methods: {
    refresh(isReset) {
      // 刷新数据 供外界调用
      this.search(isReset);
    },
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
    async search(isReset = true) {
      // 获取数据
      if (
        this.canShowSort &&
        this.tableInfo.reSortConfig &&
        this.$utils.gadgets.getPermison(this.permissionMove)
      ) {
        this.unregisterDragEvent(); // 解绑拖动事件
        this.dragInfo.exchanged = false;
        this.sortLoading = false;
      }
      this.canShowSort = this.onChangeCanShowSort(
        Object.keys(this.searchMap).length === 0
      );
      if (this.mock) {
        let rows = this._mockData();
        this.computeTableWidthAndReDraw(this.initData(this.onSearchEnd(rows)));
        isReset && this.scrollTableToTop();
      } else {
        this.loadingTimer = setTimeout(() => {
          this.isLoading = true;
        }, 300);
        let res = await this.$ajax.autoTable.getSync(
          this.tableInfo.searchUrl,
          this.getQuery(),
          this.tableInfo.method || "POST"
        );
        clearTimeout(this.initLoadingTimer);
        this.initLoading = false;
        this.pagination.total = res.total;
        let data = this.tableInfo.rowsKey
          ? res[this.tableInfo.rowsKey]
          : res.rows;
        this.computeTableWidthAndReDraw(this.initData(this.onSearchEnd(data)));
        isReset && this.scrollTableToTop();
      }
      this.modifyRowIndex = -1;
      this.modifyColIndex = -1;
      this.modifyValue = "";
    },
    initData(data) {
      // 进数据时,统一计算一遍beforeDisplay
      this.tableInfo.columns.forEach((col, colIndex) => {
        if (col.type !== "image" && col.type !== "action") {
          data = data.map((row, rowIndex) =>
            this._setComputedProp(row, rowIndex, col, colIndex)
          );
        }
      });
      return data;
    },
  },
};
</script>
<style scoped lang="less">
@import "../../style/config";
@import "../../style/style";
.auto-table-container {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  padding: @defaultPaddingY @defaultPaddingX;
  background-color: @defaultCardBgColor;
  display: flex;
  flex-direction: column;
  position: relative;
  .operation-container {
    display: flex;
    align-items: center;
    margin-bottom: @defaultPaddingY;
    flex-shrink: 0;
    .right-icons {
      margin-left: auto;
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
        font-size: 28px;
        margin-right: @defaultPaddingX / 2;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .table-container {
    width: 100%;
    margin-bottom: @defaultPaddingY;
    flex: 1;
    overflow: hidden;
    .row-container {
      display: flex;
      align-items: center;
      .with-point {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .align-center {
      justify-content: center;
    }
    .op-bt {
      margin-right: 4px;
      .op-bt-img-icon {
        width: 12px;
        position: relative;
        top: 1px;
      }
    }
    .action-op-bt {
      text-align: left !important;
      white-space: unset !important;
    }
    .input-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .input-container-input {
        width: 70%;
      }
      .submit-bt-container {
        width: 22px;
        height: 22px;
        background: @defaultBlueClick;
        border-radius: 50%;
        color: white;
        .flexCenter();
      }
    }
    .img-container {
      overflow: hidden;
      padding-right: 47px; // TODO 诡异的数字
      img {
        width: 99%;
        height: 99%;
        object-fit: scale-down;
        overflow: hidden;
        border: 1px solid @defaultBorderColor;
      }
    }
    .empty {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 245px;
      }
    }
  }
  .card-view-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
    .card-view-cell-container {
      margin: 0 15px 15px 0;
    }
  }
  .pagination-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 0;
  }
}
.cardViewWrapper {
  background-color: @defaultBgColor;
}
#canvas {
  position: absolute;
  left: -1000px;
  display: none;
}
.moveTo {
  color: #fff;
  background-color: #6ac6c8;
  border-color: #6ac6c8;
}
.moveTo.is-disabled {
  background-color: #99dee0;
  border-color: #99dee0;
}
</style>

<style lang="less">
@import "../../style/config";
@import "../../style/style";
.auto-table-container {
  .FH-table {
    border: 1px solid @defaultBorderColor;
  }
  .el-table th {
    height: 40px;
    background: @defaultTableHeadBgColor;
    color: @defaultTableHeadColor;
    font-weight: 600;
  }
}
.auto-table-pop-container {
  .el-popconfirm__action {
    margin-top: 8px;
  }
}
.el-table tr {
  height: 40px !important;
  padding: 0;
}
.el-table td {
  padding: 0;
}
.el-table__row--level-1 {
  .el-table__indent {
    display: none;
  }
}
.pointer {
  .el-table tr {
    cursor: pointer;
  }
}
.canDrag {
  transition: all @defaultAnimationTime;
  /*transform: translateY(20px);*/
}
.onDraggingRow {
  opacity: 0.4;
  transform: translateX(40px);
}
.onDraggingCanvas {
  position: fixed;
  border: 1px solid @defaultBorderColor;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  pointer-events: none;
}
.noSelect {
  user-select: none;
}
</style>
