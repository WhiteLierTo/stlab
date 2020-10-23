<template>
  <div class="two-side-photo-group">
    <div class="button-div">
      <el-button size="mini" type="primary">新增组</el-button>
      <el-button size="mini" type="primary">删除组</el-button>
      <span class="button-tips">(点击照片上传或者更换照片)</span>
    </div>
    <div class="group-div">
        <el-checkbox-group v-model="photoGroup">
        <div v-for="(item,index) in photoGroup" :key="index" class="groupItem">
            <div>
                <el-checkbox :label="`拆封照片组${index}`"></el-checkbox>
            </div>
        </div>
        </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import photoDialog from "./photoDialog";
export default {
  components: {
    photoDialog,
  },
  props: ["uploadTitle"],
  data() {
    return {
        photoGroup:[1,2,3],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.two-side-photo-group{
    border: 1px solid #ccc;
    border-left: 5px solid #ccc;
    .button-div{
        border-bottom: 1px solid #ccc;
        padding: 12px;
        .button-tips{
            margin-left: 10px;
            font-size: 14px;
            color: rgba(0,0,0,.65);
        };
    };
    .group-div{
        padding: 12px;
    };
}
</style>
