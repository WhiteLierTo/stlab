<template>
  <div class="content-box hvhjvhkvsd">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">个人工作台</a></el-breadcrumb-item>
      <el-breadcrumb-item>通知公告</el-breadcrumb-item>
    </el-breadcrumb> -->
    <Breadcrumb />
    <div class="content-main">
      <div class="content-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
export default {
  name: "content",
  components: {
    Breadcrumb,
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/config";

.content-box {
  .content-main {
    width: 100%;
    background-color: @defaultContentBgColor;
    margin: @defaultContentPadding;
    width: 98%;
    margin: 1% auto;
    .content-content {
      padding: @defaultContentPadding;
      box-shadow: 0 1px 2px 0 rgba(217, 208, 208, 0.5);
    }
  }
}
</style>

<style lang="less">
.hvhjvhkvsd {
  .el-breadcrumb {
    padding: 15px 0 0 15px;
  }
}
</style>
