<template>
  <div class="uploadDiv sdsdvdfdds">
    <div style="margin-bottom:8px">
      <el-button type="primary" size="mini" icon="el-icon-camera-solid" @click="takePhoto">拍照</el-button>
      <span v-if="uploadTitle" class="uploadTitle">{{uploadTitle}}</span>
    </div>
    <el-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <photoDialog ref="photoDialog"></photoDialog>
  </div>
</template>

<script>
import photoDialog from './photoDialog';
export default {
  components:{
    photoDialog,
  },
  props: ["uploadTitle"],
  data() {
    return {
      previewVisible: false,//图片预览框显隐
      dialogImageUrl: "",//预览图片的url
      fileList: [],//图片列表
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },//删除列表里的组件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.previewVisible = true;
    },//预览图片
    takePhoto() {
      this.$refs.photoDialog.dialogVisible = true;
    }, //打开摄像机
    getPhoto(){

    },//从照相机组件里取照片
  },
};
</script>
<style lang="less" scoped>
.uploadDiv {
  height: 150px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.cameraDiv {
  display: flex;
}
video {
  border: 1px solid #409eff;
  border-radius: 5px;
  box-shadow: 0 9px 16px 0 #cccccc80;
}
.tx_img {
  border: 1px solid #409eff;
  border-radius: 8px;
  box-shadow: 0 9px 16px 0 #cccccc80;
}
.uploadTitle {
  margin-left: 8px;
  font-weight: 600;
}
</style>
<style lang="less">
.sdsdvdfdds {
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
  }
  .el-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
