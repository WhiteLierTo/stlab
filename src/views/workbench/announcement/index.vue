<template>
  <div>
    <el-button
      class="addButton"
      size="mini"
      icon="el-icon-plus"
      type="primary"
      @click="dialogVisible = true;dialogTitle = '新增通知'"
    >新增</el-button>

    <el-table
      stripe
      :data="tableData"
      border
      style="width: 100%; margin-bottom: 15px;border-radius:8px"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column prop="no" width="60" label="序号"></el-table-column>
      <el-table-column prop="type" width="80" label="类型"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="date" width="180" label="创建时间"></el-table-column>
      <el-table-column prop="operation" width="200" label="操作">
        <template slot-scope="scope">
          <el-button
            class="cellButton"
            type="default"
            icon="el-icon-view"
            size="mini"
            @click="checkDetail(scope.row)"
          >查看</el-button>
          <el-button
            class="cellButton"
            type="default"
            icon="el-icon-edit"
            size="mini"
            @click="modifyNotice(scope.row)"
          >编辑</el-button>

          <el-popconfirm title="确定删除此条吗？" style="margin-left:10px">
            <el-button
              class="cellButton"
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteNotice(scope.row)"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="tableData.length"
        :page-sizes="[1, 2, 3, 4, 5]"
      ></el-pagination>
    </div>

    <uploadTool></uploadTool>
    <twoSidePhotoGroup></twoSidePhotoGroup>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :destroy-on-close="true">
      <el-form :model="form" :rules="rules" v-if="dialogTitle!=='查看通知'">
        <el-form-item label="标题:" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请填写标题"></el-input>
        </el-form-item>
        <el-form-item label="通知类型:" :label-width="formLabelWidth" prop="noticeType">
          <el-select v-model="form.noticeType" placeholder="请选择通知类型">
            <el-option label="通知类型" value></el-option>
            <el-option label="通知" value="tongzhi"></el-option>
            <el-option label="公告" value="gonggao"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容:" :label-width="formLabelWidth" prop="contents">
          <tinymce-editor ref="editor" v-model="form.contents" @onClick="tinymceOnClick"></tinymce-editor>
        </el-form-item>
        <el-form-item label="是否置顶:" :label-width="formLabelWidth" prop="topping">
          <el-switch
            v-model="form.topping"
            active-color="#13ce66"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-form v-else>
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <span>没有完结的案件请尽快完结</span>
        </el-form-item>
        <el-form-item label="通知类型:" :label-width="formLabelWidth">
          <span>公告</span>
        </el-form-item>
        <el-form-item label="内容:" :label-width="formLabelWidth">
          <tinymce-editor ref="editor" disabled @onClick="tinymceOnClick"></tinymce-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from "../../../components/tinyeditor";
import uploadTool from "../../../components/uploadTool";
import twoSidePhotoGroup from "../../../components/twoSidePhotoGroup";
export default {
  components: {
    TinymceEditor,
    uploadTool,
    twoSidePhotoGroup,
  },
  name: "announcement",
  data() {
    return {
      tableData: [
        {
          no: 1,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "系统优化",
        },
        {
          no: 2,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "富成做的渣渣原型",
        },
        {
          no: 3,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "没有完结的案件请尽快完结",
        },
        {
          no: 4,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "我是一条新公告",
        },
        {
          no: 5,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "我是太阳的抉择",
        },
        {
          no: 6,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "科学的甜美气息",
        },
        {
          no: 7,
          date: "2020-09-27 14:55:00",
          type: "公告",
          title: "不过是镜花水月",
        },
      ],
      currentPage: 1, //当前页
      pagesize: 10, //一页数据量
      dialogVisible: false, //对话框的显示
      dialogTitle: "新增通知",
      form: {}, //对话框表格数据
      formLabelWidth: "120px", //表格label长度
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        noticeType: [
          { required: true, message: "请选择通知类型", trigger: "blur" },
        ],
        contents: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    thStyleFun() {
      return "text-align:center;color:#515a6e;padding-top:8px;padding-bottom:8px;background-color:#fafafa";
    }, //th样式
    cellStyleFun() {
      return "text-align:center;padding-top:6px;padding-bottom:6px";
    }, //单元格样式
    handleSizeChange: function (val) {
      console.log(val);
      this.pagesize = val;
    }, //单页数据量设置方法
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    }, //切换页面方法
    //删除通知
    deleteNotice(val) {
      console.log(val);
    },
    //修改通知
    modifyNotice(val) {
      (this.dialogTitle = "编辑通知"), (this.dialogVisible = true);
    },
    //查看详情
    checkDetail(val) {
      (this.dialogTitle = "查看通知"), (this.dialogVisible = true);
      console.log(val);
    },
    //富文本点击
    tinymceOnClick(val) {},
  },
};
</script>
<style lang="less" scoped>
.addButton {
  margin-bottom: 15px;
}
.cellButton {
  padding: 5px;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>

