<template>
  <div>
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入频道名称",
          submitName: "searchValue",
        },
      ],
      tableInfo: {
        searchUrl: "/channel/list",
        deleteAllUrl: "/channel/del",
        defaultQuery: {
          searchValue: "",
        },
        columns: [
          {
            prop: "name",
            label: "频道名称",
          },
          {
            prop: "displayFlag",
            label: "显示/隐藏",
          },
          {
            prop: "isShowNewflash",
            label: "是否显示快讯",
          },
          {
            prop: "description",
            label: "备注",
          },
        ],
      },
    };
  },
};
</script>
