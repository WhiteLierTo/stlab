<template>
  <div class="header saddaadsads">
    <div class="header-left">
      <img src="../../../assets/images/logo.png" />
      <span class="system-name">STLAB v1.0</span>
    </div>
    <div class="header-middle">
      <navMenu :navMenus="navInfo" />
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../../assets/images/head.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="msgHandle">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="exitHandle">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import navMenu from "./navMenu";
import cookieApi from "../../../utils/cookie";

export default {
  name: "Header",
  components: {
    navMenu,
  },
  data() {
    return {
      navInfo: [
        {
          label: "首页",
          permissionKey: "allow",
          path: "/index/home",
        },
        {
          label: "个人工作台",
          permissionKey: "allow",
          children: [
            {
              label: "通知公告",
              path: "/workbench/announcement",
              permissionKey: "allow",
            },
            {
              label: "委托登记",
              path: "/workbench/registration",
              permissionKey: "allow",
            },
            {
              label: "我的委托",
              path: "/workbench/entrust",
              permissionKey: "allow",
            },
          ],
        },
        {
          label: "案件检材",
          permissionKey: "allow",
          children: [
            {
              label: "案件管理",
              path: "/case/case",
              permissionKey: "allow",
            },
            {
              label: "检材管理",
              path: "/case/check",
              permissionKey: "allow",
            },
          ],
        },
        {
          label: "智能报表",
          permissionKey: "allow",
          children: [
            {
              label: "笔录生成",
              path: "/report/record",
              permissionKey: "allow",
            },
            {
              label: "模板配置",
              path: "/report/template",
              permissionKey: "allow",
            },
          ],
        },
      ],
    };
  },
  methods: {
    /**退出登录 */
    exitHandle() {
      this.$router.push("/login");
      //清除token
      cookieApi.delete();
    },
    /**个人中心 */
    msgHandle() {
      this.$router.push("/user/personal");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/style";

.header {
  width: 100%;
  height: @topNavBarHeight;
  box-shadow: 0 1px 2px 0 rgba(217, 208, 208, 0.5);
  background: rgb(84, 92, 100);
  display: flex;
  flex-direction: row;
  .header-left {
    display: flex;
    flex-direction: row;
    color: #f1f1f1;
    padding-right: 15px;
    img {
      width: 77px;
      height: 55px;
      padding: 10px 0 10px 10px;
    }
    span {
      line-height: 75px;
    }
  }
  .header-middle {
    height: @topNavBarHeight;
    flex: 1;
  }
  .header-right {
    width: 35px;
    height: 35px;
    margin: 15px;
    .flexCenter();
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.system-name {
  line-height: 60px !important;
}
</style>

<style lang="less">
.saddaadsads {
  .el-submenu .el-submenu__title {
    height: 60px;
    line-height: 60px;
  }
  .el-submenu__icon-arrow {
    color: #f1f1f1;
  }

  .el-menu-item,
  .el-submenu__title {
    float: left;
    padding: 0px 30px;
  }
  .el-submenu__title i {
    padding: 10px;
  }
}
</style>
