<template>
  <div class="registration-container">
    <!-- 第一步委托信息内容开始 -->
    <el-card class="box-card entrustInfo dfefefe" shadow="never">
      <div slot="header" class="clearfix">
        <span class="section-title">委托信息</span>
      </div>
      <el-form
        :rules="entrustInfoRules"
        ref="entrustInfoForm"
        :model="registrationData.entrustInfoForm"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="委托单位:" prop="unit">
              <el-input v-model="registrationData.entrustInfoForm.unit" style="min-width: 515px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="委托人姓名:" prop="entruster">
              <el-input
                v-model="registrationData.entrustInfoForm.entruster"
                style="min-width: 190px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话:" prop="phone">
              <el-input v-model="registrationData.entrustInfoForm.phone" style="min-width: 190px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="委托编号:" prop="entrusterNo">
              <el-input
                v-model="registrationData.entrustInfoForm.entrusterNo"
                style="min-width: 190px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="委托日期:" prop="entrusterDate">
              <el-date-picker
                style="width: 100%; min-width: 190px"
                v-model="registrationData.entrustInfoForm.entrusterDate"
                type="datetime"
                placeholder="请选择委托日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="取证需求:" style="min-width: 515px" prop="evidenceDemand">
              <el-input
                type="textarea"
                rows="4"
                v-model="registrationData.entrustInfoForm.evidenceDemand"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="上传证件:" style="min-width: 515px" prop="certificates">
              <div class="uploadSection">
                <div style="margin-bottom:8px">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-camera-solid"
                    @click="openCamera"
                  >拍照</el-button>
                </div>
                <el-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  :on-preview="pictureCardPreview"
                  :file-list="fileList"
                  :on-success="uploadSuccess"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="previewVisible">
                  <img width="100%" :src="previewImageUrl" alt />
                </el-dialog>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="风险告知" prop="riskNotification">
          <el-switch
            active-color="#13ce66"
            active-text="同意"
            inactive-text="不同意"
            active-value="1"
            inactive-value="0"
            v-model="registrationData.entrustInfoForm.riskNotification"
          ></el-switch>
          <span class="adiv" @click="showStatement('风险告知')">查看风险告知</span>
        </el-form-item>

        <el-form-item label="诚信声明" prop="statement">
          <el-switch
            active-color="#13ce66"
            active-text="同意"
            inactive-text="不同意"
            active-value="1"
            inactive-value="0"
            v-model="registrationData.entrustInfoForm.statement"
          ></el-switch>
          <span class="adiv" @click="showStatement('诚信声明')">查看诚信声明</span>
        </el-form-item>
      </el-form>
      <el-dialog :title="statementTitle" :visible.sync="statementVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="statementVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="statementVisible = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <!-- 第一步委托信息内容结束 -->

    <!-- 第二步案件信息内容开始 -->
    <el-card class="box-card caseInfo" shadow="never">
      <div slot="header" class="clearfix">
        <span class="section-title">案件信息</span>
      </div>
      <el-form
        :rules="caseInfoRules"
        ref="caseInfoForm"
        :model="registrationData.caseInfoData"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="案件编号:" prop="caseNo">
              <el-input v-model="registrationData.caseInfoData.caseNo" style="min-width: 515px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span class="caseNoTips">
              <i class="el-icon-info"></i>如果之前已录入案件,请输入案件编号
            </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="案件名称:" prop="caseName">
              <el-input v-model="registrationData.caseInfoData.caseName" style="min-width: 190px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="案件类型:" prop="caseType">
              <el-select
                style="width: 100%; min-width: 190px"
                v-model="registrationData.caseInfoData.caseType"
                placeholder="请选择案件类型"
              >
                <el-option label="黑客案件" value="hk"></el-option>
                <el-option label="赌博案" value="db"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="鉴定用途:" prop="identifyPurpose">
              <el-select
                style="width: 100%; min-width: 190px"
                v-model="registrationData.caseInfoData.identifyPurpose"
                placeholder="请选择鉴定用途"
              >
                <el-option label="黑客案件" value="hk"></el-option>
                <el-option label="赌博案" value="db"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="是否出具文书:" prop="isDocument">
          <el-switch
            active-color="#13ce66"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="0"
            v-model="registrationData.caseInfoData.isDocument"
          ></el-switch>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="案情摘要:" style="min-width: 515px" prop="abstract">
              <el-input type="textarea" rows="4" v-model="registrationData.caseInfoData.abstract"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 第二步案件信息内容结束 -->

    <!-- 第三步检材登记内容开始 -->
    <el-card class="box-card materialRegister" shadow="never">
      <div slot="header" class="clearfix">
        <span class="section-title">检材登记</span>
      </div>
    </el-card>
    <!-- 第三步检材登记内容结束 -->

    <!-- 第四步委托材料内容开始 -->
    <el-card class="box-card entrustMaterial" shadow="never">
      <div slot="header" class="clearfix">
        <span class="section-title">委托材料</span>
      </div>
    </el-card>
    <!-- 第四步委托材料内容结束 -->

    <cameraDialog
      :cameraVisible="cameraVisible"
      :diyId="'entrustInfo'"
      @closeCamera="closeCamera"
      @getPhotoFile="getPhotoFile"
    ></cameraDialog>
    <div class="buttonDiv">
      <el-button type="default" v-if="active!==0 && active!==4" size="small" @click="goBack">上一步</el-button>
      <el-button type="primary" v-if="active!==3 && active!==4" size="small" @click="goNext ">下一步</el-button>
      <el-button type="warning" v-if="active===3" size="small" @click="submitEntrust">提交委托</el-button>
    </div>
  </div>
</template>

<script>
import cameraDialog from "../../../components/camera/cameraDialog";
export default {
  components: {
    cameraDialog,
  },
  name: "registration",
  data() {
    return {
      active: 0, //tab页当前索引
      registrationData: {
        entrustInfoForm: {
          unit: "", //委托单位
          entruster: "", //委托人姓名
          phone: "", //联系电话
          entrusterNo: "", //委托编号
          entrusterDate: "", //委托日期
          evidenceDemand: "", //取证需求
          certificates: "", //证件
          riskNotification: 0, //风险告知
          statement: 0, //诚信声明
        }, //第一步委托信息的数据对象
        caseInfoData: {
          caseNo: "",
          caseName: "",
          caseType: "",
          identifyPurpose: "",
          isDocument: "",
          abstract: "",
        }, //第二步案件信息数据对象
      }, //委托登记四步的数据对象
      entrustInfoRules: {
        unit: [{ required: true, message: "请填写标题", trigger: "blur" }],
        entruster: [
          { required: true, message: "请选择通知类型", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
        entrusterNo: [
          { required: true, message: "请填写委托编号", trigger: "blur" },
        ],
        entrusterDate: [
          { required: true, message: "请选择委托日期", trigger: "change" },
        ],
        evidenceDemand: [
          { required: true, message: "请填写取证需求", trigger: "blur" },
        ],
        riskNotification: [{ required: true, trigger: "blur" }],
        statement: [{ required: true, trigger: "blur" }],
      }, //第一步委托登记的表单验证规则
      previewVisible: false, //预览图片的显隐
      previewImageUrl: "", //预览的图片url
      statementVisible: false, //第一步委托登记声明dialog的显隐
      statementTitle: "风险告知", //第一步委托登记声明dialog的标题
      cameraVisible: false, //控制照相机dialog的显隐
      fileList: [], //上传证件文件列表
      caseInfoRules: {
        caseNo: [
          { required: true, message: "请填写案件编号", trigger: "blur" },
        ],
        caseName: [
          { required: true, message: "请填写案件名称", trigger: "blur" },
        ],
        caseType: [
          { required: true, message: "请选择案件类型", trigger: "change" },
        ],
        identifyPurpose: [
          { required: true, message: "请选择鉴定用途", trigger: "change" },
        ],
      }, //第二步案件信息的表单验证规则
    };
  },

  methods: {
    goBack() {
      this.active--;
    }, //上一步
    goNext() {
      this.active++;
    }, //下一步
    submitEntrust() {}, //提交委托
    showStatement(type) {
      this.statementTitle = type;
      this.statementVisible = true;
    }, //第一步中点击打开风险告知和诚信声明下落框
    pictureCardPreview(file) {
      this.previewImageUrl = file.url;
      this.previewVisible = true;
    }, //第一步上传图片预览图片
    uploadSuccess(response, file, fileList) {
      console.log(response);
      this.fileList = [...this.fileList, response];
    },
    openCamera() {
      this.cameraVisible = true;
    }, //第一步打开照相机
    closeCamera() {
      this.cameraVisible = false;
    }, //关闭照相机
    getPhotoFile(file) {
      this.fileList = [...this.fileList, file];
    },
  },

  watch: {},
  created() {},
};
</script>
<style lang="less" scoped>
.registration-container {
  .box-card {
    margin-bottom: 12px;
    .section-title {
      font-size: 18px;
      font-weight: normal;
    }
  }
  .buttonDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .entrustInfo {
    padding-left: 15px;
    .adiv {
      color: #409eff;
      text-decoration: underline;
      margin-left: 10px;
      margin-top: 2px;
      cursor: pointer;
    }
  }
  .caseInfo {
    .caseNoTips {
      color: grey;
      font-size: 12px;
      margin-left: 5px;
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
<style lang="less">
.dfefefe {
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