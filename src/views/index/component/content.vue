<template>
  <div class="content-main">
    <div class="content-content">
      <a-card :bordered="false">
        <router-view/>
      </a-card>
    </div>
  </div>
</template>
    </div>
  </div>
</template>

<script>
export default {
  name: "content",
};
</script>

<style lang="less" scoped>
@import "../../../style/config";

.content-main {
  width: 100%;
  background-color: @defaultContentBgColor;
  margin: @defaultContentPadding;
  width: 98%;
  margin: 1% auto;
  .content-content {
    padding: @defaultContentPadding;
  }
}
</style>
