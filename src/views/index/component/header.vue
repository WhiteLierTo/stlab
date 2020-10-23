<template>
  <div class="header saddaadsads">
    <div class="header-left">
      <img src="../../../assets/images/logo.png" />
      <span class="system-name">STLAB v1.0</span>
    </div>
    <div class="header-middle">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#57A3F3"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          :index="item.label"
          v-for="(item, index) in navInfo"
          :key="index"
        >
          <template slot="title">{{ item.label }}</template>
          <el-menu-item
            :index="item1.path"
            v-for="(item1, index) in item.children"
            :key="index"
          >
            {{ item1.label }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../../assets/images/head.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      navInfo: [
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push({ path: key });
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
  background: #57A3F3;
  display: flex;
  flex-direction: row;
  .header-left {
    display: flex;
    flex-direction: row;
    color: #f1f1f1;
    padding-right: 15px;
    img {
      width: 77px;
      height: 56px;
      padding: 10px 0 10px 10px;
    }
    span {
      line-height: 75px;
    }
  }
  .header-middle {
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
};
.system-name
{
  line-height: 55px!important;
}
</style>

<style lang="less">
.saddaadsads {
  .el-submenu .el-submenu__title {
    height: 55px;
    line-height: 55px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  };
  .el-submenu__icon-arrow
{
  color: #f1f1f1;
};
}
</style>
