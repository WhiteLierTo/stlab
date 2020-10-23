<template>
  <div class="login-main">
    <div class="center-content">
      <div class="center-content-left"></div>
      <div class="center-content-right">
        <div class="content-right-title">
          <p>系统登录</p>
          <p>WELCOME TO STLAB</p>
        </div>
        <div class="formItem">
          <span class="el-icon-user"></span>
          <el-input
            size="middle"
            placeholder="请输入用户名"
            v-model="name"
            clearable
          ></el-input>
        </div>
        <div class="formItem">
          <span class="el-icon-lock"></span>
          <el-input
            size="middle"
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </div>
        <verificationcode></verificationcode>
        <el-button type="primary" size="middle" @click="loginHandle"
          >登录</el-button
        >
      </div>
    </div>
    <div class="login-footer">
      Copyright © www.jsdyt.com 2020 - 江苏鼎跃腾信息技术有限公司
    </div>
  </div>
</template>

<script>
import verificationcode from "../../../components/verificationcode";
export default {
  components: { verificationcode },
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async loginHandle() {
      let [ok, tokenOrMsg] = await this.$ajax.login.loginSync(
        this.name,
        this.password
      );

      if (ok) {
        this.$utils.cookie.set(tokenOrMsg);
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../style/config.less";
.login-main {
  height: 100%;
  background: url("../../../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .center-content {
    width: 900px;
    height: 450px;
    margin: 0 auto;
    display: flex;
    background: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #bfbfbf;
    .center-content-left {
      width: 504px;
      height: 100%;
      background: url("../../../assets/images/loginBox.png") no-repeat;
      background-size: 100% 100%;
    }
    .center-content-right {
      width: 396px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 6% 5% 6% 5%;
      .content-right-title {
        margin-top: -15px;
        p:nth-child(1) {
          font-size: 28px;
        }
        p:nth-child(2) {
          font-size: 14px;
        }
      }
      .formItem {
        display: flex;
        align-items: center;
        span {
          font-size: 24px;
          margin-right: 10px;
        }
      }
    }
  }
  .login-footer {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 8%;
    font-size: 14px;
  }
}
</style>
