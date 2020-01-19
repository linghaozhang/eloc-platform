<template>
  <div class="serviceMonitor">
    <div class="serviceMonitor-table">
      <a-table bordered :dataSource="tableData" :columns="columns" rowKey="count" size="small"></a-table>
    </div>
  </div>
</template>
<script>
import columns from "./columns";
import { getServiceMonitor } from "api/systemConfiguation";
import {sysConfigAddRowspan } from 'utils/utils'
export default {
  data() {
    return {
      columns,
      tableData: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      getServiceMonitor().then(({ msg }) => {
        this.tableData = sysConfigAddRowspan(msg)
      });
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>