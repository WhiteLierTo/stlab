<template>
  <div class="bjkjd">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(84, 92, 100)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(item, i) in navMenus">
        <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-if="item.children" :index="i + ''" :key="i">
          <template slot="title">
            <span slot="title">{{ item.label }}</span>
          </template>
          <nav-Menu :navMenus="item.children" />
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navMenu", //模板名称
  data() {
    return {
      activeIndex: "1",
    };
  },
  props: ["navMenus"],
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
    },
  },
};
</script>

<style lang="less">
.bjkjd {
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item {
    border-bottom: none;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
}
</style>
