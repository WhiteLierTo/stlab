<template>
  <div class="home">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from "./component/header";
import Content from "./component/content";

export default {
  name: "Home",
  components: {
    Header,
    Content,
  },
};
</script>

<style lang="less" scoped></style>
