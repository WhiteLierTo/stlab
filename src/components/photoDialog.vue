<template>
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
          <canvas style="display:none" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
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
      dialogVisible: false, //photo组件的显隐
      videoWidth: 480, //video组件的宽度
      videoHeight: 320, //video组件的高度
      imgSrc: "", //右侧预览图片的url
      thisCanvas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      devicesArr: [], //设备列表
      currentDevice: "", //select选择框当前设备
    };
  },
  methods: {
    cancel() {
      if (this.thisVideo) {
        this.stopNavigator();
      }
      this.dialogVisible = false;
    },
    dialogClose() {
      if (this.thisVideo) {
        this.stopNavigator();
      }
      this.imgSrc = "";
    }, //关闭dialog时关闭摄像头
    comfirm() {
      this.uploadPhoto();
      //   if (this.thisVideo) {
      //     this.stopNavigator();
      //   }
      //   this.dialogVisible = false;
    }, //点击确认按钮传递照片信息去父组件
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
        _this.devicesArr = exArray;
      });
    }, //获取电脑上的设备列表
    getCompetence(deviceIndex) {
      var _this = this;
      _this.thisCanvas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCanvas.getContext("2d");
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
    }, // 调用权限（打开摄像头功能）
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
      var image = this.thisCanvas.toDataURL("image/png");
      _this.imgSrc = image; //赋值并预览图片
    }, //  绘制图片（拍照功能）
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    }, // 关闭摄像头
    // dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(",");
    //   var mime = arr[0].match(/:(.*?);/)[1];
    //   var bstr = atob(arr[1]);
    //   var n = bstr.length;
    //   var u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // }, // base64转文件，此处没用到
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(base64Data.split(",")[1]);
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    dialogOpen() {
      this.getCompetence();
      this.getDevice();
    }, //监听组件打开时启动摄像头并且获取电脑上的摄像头列表
    chooseDevice(value) {
      this.getCompetence(value);
    }, //select切换摄像头
    uploadPhoto() {
      const _this = this;
      if (_this.imgSrc == "") {
        _this.$message({
          message: "请您先点击拍照，再进行上传！",
          type: "warning",
        });
        return;
      }
      let canvas = document.getElementById("canvasCamera");
      let dataurl = canvas.toDataURL("image/png");
      var formData = new FormData();
      const base64File = _this.dataURItoBlob(dataurl);
      formData.append("file", base64File, "image.png");
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://192.168.0.100:8080/file/upload", true);
      // 添加http头，发送信息至服务器时内容编码类型
      //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200 || xhr.status == 304) {
            _this.$message({
              message: "上传成功！",
              type: "success",
            });
            console.log(xhr.responseText);
            // fn.call(xhr.responseText);
          } else {
            _this.$message({
              message: "上传失败！",
              type: "error",
            });
          }
        }
      };
      xhr.send(formData);
    }, //上传图片
  },
};
</script>
<style lang="less" scoped>
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
</style>