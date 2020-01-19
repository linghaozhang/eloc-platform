<template>
  <div class="bscWarnTip">
    <div class="bscWarnTip-form">
      <a-form layout="inline">
        <a-form-item label="首页弹窗告警提示时间">
          <a-time-picker
            style="width:150px;margin-right:15px;"
            placeholder="请选择开始时间"
            v-model="startTime"
            format="HH:mm"
          />
          <a-time-picker
            style="width:150px"
            placeholder="请选择结束时间"
            v-model="endTime"
            format="HH:mm"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="saveTableData">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="bscWarnTip-table">
      <a-table
        :dataSource="tableData"
        :columns="columns"
        size="small"
        :pagination="pagination"
        rowKey="count"
      >
        <template slot="warningAlert" slot-scope="text,record">
          <div>
            <a-select style="width:100px" :defaultValue="String(record.warningSend)" @change="(v)=>warnSendChange(v,record)">
              <a-select-option value="0">不告警</a-select-option>
              <a-select-option value="12">弹窗告警</a-select-option>
            </a-select>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getWarningParam ,updateWarningParam} from "api/systemConfiguation";
import moment from "moment";
import columns from "./columns";
export default {
  data() {
    return {
      columns,
      startTime: moment(),
      endTime: moment(),
      tableData: [],
      pagination: {
        pageSize: 12
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    moment,
    getTableData() {
      getWarningParam().then(({ msg }) => {
        this.tableData = msg.map((i, n) => ({ ...i, count: n + 1 }));
        this.startTime = moment()
          .hours(msg[0].startDate.split(":")[0])
          .minutes(msg[0].startDate.split(":")[1]);
        this.endTime = moment()
          .hours(msg[0].endDate.split(":")[0])
          .minutes(msg[0].endDate.split(":")[1]);
      });
    },
    switchWarnSend(text) {
      switch (text) {
        case "0":
          return "不告警";
        case "11":
          return "首页告警";
        case "12":
          return "弹窗告警";
        case "13":
          return "短信告警";
      }
    },
    warnSendChange(value, record) {
      console.log(value, record);
      let cache = [...this.tableData]
      cache.forEach(i=>{  
        if(record.count === i.count && record.warningId === i.warningId){
          i.warningSend = Number(value)
        }
      })
      this.tableData = [...cache]
    },
    saveTableData(){
      const startTime = this.startTime.format("HH:mm")
      const endTime = this.endTime.format("HH:mm")
      let cache = [...this.tableData]
      cache.forEach(i=>{
        i.endDate = endTime;
        i.startDate = startTime;
      })
      updateWarningParam(cache).then(res=>{
        if(res.code === 0){
          this.$success({title:"保存成功"})
        }
      })
      
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>