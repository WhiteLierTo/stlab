<template>
  <div class="personal">
    <div class="title">修改个人信息</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="所属部门" prop="partment">
        <el-input v-model="ruleForm.partment"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="警号" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重新填写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        partment: "",
        username: "",
        sex: 1,
        realname: "",
        number: "",
        phone: "",
      },
      rules: {
        partment: [
          { required: true, message: "请输入所属部门", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config.less";

.personal {
  .title {
    font-size: @bigFontSize;
    color: @defaultTileColor;
    padding: 10px 10px 30px 10px;
  }
  .ruleForm {
    width: 25%;
  }
}
</style>
