<template>
  <div class="baseRoadTopology">
    <div class="baseRoadTopology-form">
      <a-form layout="inline">
        <a-form-item label="起始路口">
          <eloc-select placeholder="请选择起始路口" v-model="startInfo" />
        </a-form-item>
        <a-form-item label="终止路口">
          <eloc-select placeholder="请选择终止路口" v-model="endInfo" />
        </a-form-item>
        <a-form-item label="路段等级">
          <a-select
            placeholder="请选择路段等级"
            :options="roadSectionLevelOption"
            style="width:200px"
            v-model="roadSectionLevel"
          />
        </a-form-item>
        <a-form-item style="margin-right:16px;float:right">
          <a-button @click="getTableData" type="primary" style="margin-right:20px">查询</a-button>
          <a-button @click="clear">清空</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="baseRoadTopology-table">
      <div class="baseRoadTopology-table-btns">
        <a-button @click="onDownload" icon="download">导出</a-button>
        <a-button @click="onCreate" type="primary">新增</a-button>
      </div>
      <a-table bordered rowKey="count" :columns="columns" size="small" :dataSource="tableData" :loading="loading" />
    </div>
  </div>
</template>

<script>
import ElocSelect from "components/common/ElocSelect";
import columns from "./columns";
import { getRoadTopologyInfo, getCrossNoById } from "api/roadTopology";

export default {
  name: "baseRoadTopology",
  data() {
    return {
      columns,
      loading: false,
      startInfo: "",
      endInfo: "",
      roadSectionLevel: undefined,
      roadSectionLevelOption: [
        { label: "快速路", value: "0001" },
        { label: "主干路", value: "0002" },
        { label: "次路", value: "0003" },
        { label: "支路", value: "0004" }
      ],
      tableData: []
    };
  },
  components: {
    ElocSelect
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      let beginCrossId = this.startInfo.substr(0, 4);
      let endCrossId = this.endInfo.substr(0, 4);
      let all = [];
      console.log(beginCrossId, endCrossId);
      if (beginCrossId) {
        all.push(getCrossNoById({ crossId: beginCrossId }));
      }
      if (endCrossId) {
        all.push(getCrossNoById({ crossId: endCrossId }));
      }
      Promise.all(all).then(res => {
        const params = {
          beginCrossNo: res[0] ? res[0].msg.crossNo : "",
          endCrossNo: res[1] ? res[1].msg.crossNo : "",
          roadSectionLevel: this.roadSectionLevel || ""
        };
        getRoadTopologyInfo(params).then(res => {
          this.tableData = res.msg.map((i,n)=>({...i,count:n+1}));
          this.loading = false;
        });
      });
    },
    onCreate() {},
    onDownload() {},
    clear() {}
  }
};
</script>
<style lang="less">
@import "index";
</style>
