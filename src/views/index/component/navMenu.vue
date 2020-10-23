<template>
  <div>
    <span v-for="item in navMenus" :key="item.label">
      <el-submenu :index="item.label" v-if="item && item.children">
        <template slot="title">
          <span slot="title">{{ item.label }}</span>
        </template>
        <navMenu :navMenus="item.children"></navMenu>
      </el-submenu>
      <el-menu-item :index="item.path" :key="item.label" v-else>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </span>
  </div>
</template>

<script>
export default {
  name: "navMenu", //模板名称
  data() {
    return {};
  },
  beforeMount() {},
  props: ["navMenus"],
};
</script>
