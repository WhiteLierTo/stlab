<template>
  <div class="table-width-filter-container">
    <div class="conditionFilters">
      <conditionFilters :filtersInfo="filtersInfo" />
    </div>
    <div class="autoTable">
      <autoTable :tableInfo="tableInfo" />
    </div>
  </div>
</template>

<script>
import autoTable from "./autoTable";
import conditionFilters from "./conditionFilters";

export default {
  name: "tableWithFilter",
  components: {
    autoTable,
    conditionFilters,
  },
  props: ["filtersInfo", "tableInfo"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
