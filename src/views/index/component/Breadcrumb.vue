<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.meta.label">
          <span v-if="index == levelList.length - 1" class="no-redirect">{{
            item.meta.label
          }}</span>
          <router-link v-else :to="item.path">{{
            item.meta.label
          }}</router-link>
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "idnex",
  data() {
    return {
      levelList: null,
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.meta.label); //$route.matched 将会是一个包含从上到下的所有对象 (副本)。
      let router = matched.map((item) => {
        return {
          path: item.path,
          meta: { label: item.meta.label },
        };
      });
      const first = router[0];
      if (first && first.name !== "首页") {
        //$route.name当前路由名称  ；$route.redirectedFrom重定向来源的路由的名字
        router = [{ path: "/", meta: { label: "首页" } }].concat(matched);
      } else if (router.length === 0) {
        router = [{ path: "/", meta: { label: "首页" } }];
      }
      this.levelList = router;
    },
  },
};
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
