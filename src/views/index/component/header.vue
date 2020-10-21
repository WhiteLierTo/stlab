<template>
  <div class="header saddaadsads">
    <div class="header-left">
      <img src="../../../assets/images/logo.png" />
    </div>
    <div class="header-middle">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">个人工作台</template>
          <el-menu-item index="/workbench/announcement">
            通知公告
          </el-menu-item>
          <el-menu-item index="/workbench/registration">委托登记</el-menu-item>
          <el-menu-item index="/workbench/entrust"> 我的委托</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">案件检材</template>
          <el-menu-item index="2-1">案件管理</el-menu-item>
          <el-menu-item index="2-2">检材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">智能报表</template>
          <el-menu-item index="3-1">笔录生成</el-menu-item>
          <el-menu-item index="3-2">模板配置</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">设备报表</template>
          <el-menu-item index="4-1"> 勘验设备管理</el-menu-item>
          <el-menu-item index="4-2">基础设施管理</el-menu-item>
          <el-menu-item index="4-3">智能柜管理</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">学习管理</template>
          <el-menu-item index="5-1">技术标准</el-menu-item>
          <el-menu-item index="5-2">学习园地</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">驾驶舱</template>
          <el-menu-item index="6-1">数据大屏</el-menu-item>
          <el-menu-item index="6-2">业务大屏</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">用户角色</template>
          <el-menu-item index="7-1">组织管理</el-menu-item>
          <el-menu-item index="7-2">用户管理</el-menu-item>
          <el-menu-item index="7-3">角色管理</el-menu-item>
          <el-menu-item index="7-4">菜单管理管理</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">系统管理</template>
          <el-menu-item index="8-1">系统配置</el-menu-item>
          <el-menu-item index="8-2">字典设置</el-menu-item>
          <el-menu-item index="8-3">日志管理</el-menu-item>
          <el-menu-item index="8-4">数据录入</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="header-right">
      <img src="../../../assets/images/head.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
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

.header {
  width: 100%;
  height: @topNavBarHeight;
  box-shadow: 0 1px 2px 0 rgba(217, 208, 208, 0.5);
  background: rgb(84, 92, 100);
  display: flex;
  flex-direction: row;
  .header-left {
    width: 150px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
      padding: 15px;
    }
  }
  .header-middle {
    flex: 1;
  }
  .header-right {
    width: 45px;
    height: 45px;
    margin: 15px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>

<style lang="less">
.saddaadsads {
  .el-submenu .el-submenu__title {
    height: 75px;
    line-height: 75px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
}
</style>
