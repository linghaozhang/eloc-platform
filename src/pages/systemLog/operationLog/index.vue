<template>
  <div class="operationLog">
    <div class="operationLog-form">
      <a-form layout="inline">
        <a-form-item label="起止时间">
          <a-range-picker
            :showTime="{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm'), moment('00:00:00', 'HH:mm')]
                      }"
            format="YYYY-MM-DD HH:mm"
            v-model="rangePickerValue"
          />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input placeholder="请输入用户名" style="width:200px" v-model="userName" />
        </a-form-item>
        <a-form-item label="操作名称">
          <a-select
            placeholder="请选择操作名称"
            :options="operNameOption"
            style="width:200px"
            v-model="operName"
          />
        </a-form-item>
        <a-form-item label="操作对象">
          <a-input placeholder="请输入操作对象" style="width:200px" v-model="crossId" />
        </a-form-item>
        <a-form-item label="结果">
          <a-select
            placeholder="请选择结果"
            :options="operResultOption"
            style="width:200px"
            v-model="operResult"
          />
        </a-form-item>
      </a-form>
      <div style="height:40px;margin-top:20px;">
        <a-form-item style="float:right">
          <a-button type="primary" style="margin-right:20px" @click="geTableData">查询</a-button>
          <a-button @click="clear" style="margin-right:20px">清空</a-button>
          <a-button icon="download" @click="downLoad">导出</a-button>
        </a-form-item>
      </div>
    </div>
    <div class="operationLog-table">
      <a-table
        bordered
        :columns="columns"
        :dataSource="tableData"
        :loading="loading"
        rowKey="count"
        :pagination="pagination"
        size="small"
      ></a-table>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import columns from "./columns";
import { getOperationLogData, exportOperationExcel } from "api/systemLog";
import { downloadFile } from 'utils/utils'
export default {
  data() {
    return {
      rangePickerValue: [
        this.moment(new Date()).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }),
        this.moment(new Date())
      ],
      operNameOption: [
        { label: "新增", value: "U11" },
        { label: "编辑", value: "U13" },
        { label: "删除", value: "U14" },
        { label: "上传", value: "U21" },
        { label: "下载", value: "U22" },
        { label: "联机", value: "U23" },
        { label: "脱机", value: "U24" },
        { label: "手动", value: "U31" },
        { label: "校时", value: "U32" }
      ],
      operResultOption: [
        { label: "成功", value: "1" },
        { label: "失败", value: "0" },
    
      ],
      columns,
      tableData: [],
      pagination: {
        pageSize: 13,
      },
      loading: false,
      operName: undefined,
      operResult: undefined,
      userName: "",
      crossId: "",
    };
  },
  mounted() {
    this.geTableData();
  },
  methods: {
    moment,
    geTableData() {
      const operDateStart = this.rangePickerValue[0].format("YYYY-MM-DD HH:mm:ss");
      const operDateEnd = this.rangePickerValue[1].format("YYYY-MM-DD HH:mm:ss");
      const diff =new Date(operDateEnd).getTime() - new Date(operDateStart).getTime();
      if (diff > 86400000 * 30) {
        return this.$error({ title: "查询时间不能大于30天，请重新选择！" });
      }
      this.loading = true;
      const params = {
        operDateStart,
        operDateEnd,
        userName: this.userName,
        operName: this.operName || "",
        operResult: this.operResult || "",
        crossId: this.crossId
      };
      getOperationLogData(params).then(res => {
        this.loading = false;
        this.tableData = res.msg.map((i, n) => ({
          ...i,
          count: n + 1
        }));
      });
    },
    clear() {
      this.operName = undefined;
      this.operResult = undefined;
      this.userName = '';
      this.crossId = "";
    },
    downLoad() {
      const operDateStart = this.rangePickerValue[0].format("YYYY-MM-DD HH:mm:ss");
      const operDateEnd = this.rangePickerValue[1].format("YYYY-MM-DD HH:mm:ss");
      const params = {
        operDateStart,
        operDateEnd,
        userName: this.userName || "",
        operName: this.operName || "",
        warningKind: this.warningKind || "",
        crossId: this.crossId
      };
      exportOperationExcel(params).then(stream => {
        downloadFile("操作日志.xlsx",stream)
      });
    }
  }
};
</script>     
<style lang="less">
@import "index";
</style>   