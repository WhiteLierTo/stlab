<template>
  <div class="content-box hvhjvhkvsd">
    <Breadcrumb />
    <div class="content-main">
      <div class="content-content">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
export default {
  name: "Content",
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
    margin: 0 auto;
    .content-content {
      padding: @defaultContentPadding;
      box-shadow: 0 1px 2px 0 rgba(217, 208, 208, 0.5);
    }
  }
}
</style>

<style lang="less">
@import "../../../style/config.less";

.hvhjvhkvsd {
  .el-breadcrumb {
    padding: 15px 0 0 15px;
  }
};
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
};

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-10px);
};

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
};
</style>
