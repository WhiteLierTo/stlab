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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <el-dialog
      title="拍照"
      :visible.sync="dialogVisible"
      width="53%"
      style="padding-bottom: 0"
      @opened="dialogOpen"
      @closed="dialogClose"
      destroy-on-close
    >
      <div class="camera_outer">
        <div style="display: flex">
          <div style="margin-right: 15px">
            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
            <canvas
              style="display:none"
              id="canvasCamera"
              :width="videoWidth"
              :height="videoHeight"
            ></canvas>
          </div>
          <div v-if="imgSrc" class="img_bg_camera">
            <img :src="imgSrc" alt class="tx_img" />
          </div>
        </div>
        <div class="button">
          <el-button size="mini" type="primary" @click="getCompetence()">打开</el-button>
          <el-button size="mini" type="primary" @click="stopNavigator()">关闭</el-button>
          <el-button size="mini" type="success" @click="setImage()">拍照</el-button>
          <el-select
            v-model="currentDevice"
            size="small"
            style="margin-left:78px"
            @change="chooseDevice"
            placeholder="请选择摄像头"
          >
            <el-option
              v-for="item in devicesArr"
              :key="item.deviceId"
              :label="item.label"
              :value="item.deviceId"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="comfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ["uploadTitle"],
  data() {
    return {
      dialogVisible: false,
      previewVisible: false,
      dialogImageUrl: "",
      fileList: [],
      videoWidth: 480,
      videoHeight: 320,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      devicesArr: [],
      currentDevice: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    cancel() {
      if (this.thisVideo) {
        this.stopNavigator();
      }
      this.dialogVisible = false;
    },
    takePhoto() {
      this.dialogVisible = true;
    }, //拍照按钮
    dialogClose() {
      if (this.thisVideo) {
        this.stopNavigator();
      }
      this.imgSrc = "";
    },
    comfirm() {
      if (this.thisVideo) {
        this.stopNavigator();
      }
      this.dialogVisible = false;
      this.getDevice();
    },

    getDevice() {
      const _this = this;
      const exArray = [];
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        devices.forEach(function (device) {
          if (device.kind === "videoinput" && device.label) {
            let obj = {};
            obj.label = device.label;
            obj.deviceId = device.deviceId;
            exArray.push(obj);
          }
        });
        console.log(exArray);
        _this.devicesArr = exArray;
      });
    },
    // 调用权限（打开摄像头功能）
    getCompetence(deviceIndex) {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      console.log(document.getElementById("videoCamera"));
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
          deviceId: { exact: deviceIndex },
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image; //赋值并预览图片
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    dialogOpen() {
      this.getCompetence();
      this.getDevice();
    },
    chooseDevice(value) {
      console.log(value);
      this.getCompetence(value);
    },
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
