<template>
  <div class="warnLog">
    <div class="warnLog-form">
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
        <a-form-item label="告警类型">
          <a-select
            placeholder="请选择告警类型"
            :options="warningTypeOption"
            style="width:200px"
            v-model="warningKind"
          />
        </a-form-item>
        <a-form-item label="路口信息">
          <a-input placeholder="请输入路口名称或编号" style="width:200px" v-model="crossId" />
        </a-form-item>
        <a-form-item label="告警级别">
          <a-select
            placeholder="请选择告警级别"
            :options="warningLevelOption"
            style="width:200px"
            v-model="warningLevel"
          />
        </a-form-item>
        <a-form-item label="告警明细">
          <a-select
            placeholder="请选择告警明细"
            :options="warningDetaillOption"
            style="width:200px"
            v-model="warningId"
          />
        </a-form-item>
      </a-form>
      <div style="height:40px;margin-top:20px;">
        <a-form-item style="float:right">
          <a-button type="primary" style="margin-right:20px" @click="(e)=>geTableData()">查询</a-button>
          <a-button @click="clear" style="margin-right:20px">清空</a-button>
          <a-button icon="download" @click="downLoad">导出</a-button>
        </a-form-item>
      </div>
    </div>
    <div class="warnLog-table">
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
import { getWarnLogData, exportWarnExcel } from "api/systemLog";
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
      warningTypeOption: [
        { label: "信号机", value: "1" },
        { label: "信号灯", value: "2" },
        { label: "检测器", value: "3" },
        { label: "服务器", value: "5" }
      ],
      warningLevelOption: [
        { label: "一级", value: "1" },
        { label: "二级", value: "2" },
        { label: "三级", value: "3" }
      ],
      warningDetaillOption: [
        { label: "MMU检测板故障", value: "W101" },
        { label: "BOU板故障", value: "W102" },
        { label: "灯箱输出板故障", value: "W103" },
        { label: "电源故障", value: "W104" },
        { label: "网络故障", value: "W108" },
        { label: "红灯故障", value: "W201" },
        { label: "红绿同亮", value: "W202" },
        { label: "绿冲突", value: "W203" },
        { label: "检测器异常", value: "W301" },
        { label: "服务器异常", value: "W501" }
      ],
      columns,
      tableData: [],
      pagination: {
        pageSize: 13,
        change: (page, pageSize) => this.geTableData(page, pageSize)
      },
      loading: false,
      warningKind: undefined,
      warningLevel: undefined,
      warningId: undefined,
      crossId: ""
    };
  },
  mounted() {
    this.geTableData();
  },
  methods: {
    moment,
    geTableData(currentPageNum = 1, pageRecordSize = 20) {
      const logDateStart = this.rangePickerValue[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const logDateEnd = this.rangePickerValue[1].format("YYYY-MM-DD HH:mm:ss");
      const diff =
        new Date(logDateEnd).getTime() - new Date(logDateStart).getTime();
      console.log(diff);
      if (diff > 86400000 * 30) {
        return this.$error({ title: "查询时间不能大于30天，请重新选择！" });
      }
      this.loading = true;
      const params = {
        currentPageNum,
        pageRecordSize,
        logDateStart,
        logDateEnd,
        warningId: this.warningId || "",
        warningLevel: this.warningLevel || "",
        warningKind: this.warningKind || "",
        crossId: this.crossId
      };
      getWarnLogData(params).then(res => {
        this.loading = false;
        this.tableData = res.msg.map((i, n) => ({
          ...i,
          count: n + 1
        }));
        console.log(this.tableData);
      });
    },
    clear() {
      this.warningKind = undefined;
      this.warningLevel = undefined;
      this.warningId = undefined;
      this.crossId = "";
    },
    downLoad() {
      const logDateStart = this.rangePickerValue[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const logDateEnd = this.rangePickerValue[1].format("YYYY-MM-DD HH:mm:ss");
      const params = {
        logDateStart,
        logDateEnd,
        warningId: this.warningId || "",
        warningLevel: this.warningLevel || "",
        warningKind: this.warningKind || "",
        crossId: this.crossId
      };
      exportWarnExcel(params).then(res => {
        const blob = new Blob([res]);
        const downloadElement = document.createElement("a");
        downloadElement.style.display = "none";
        const href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = "告警日志.xlsx"; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    }
  }
};
</script>     
<style lang="less">
@import "index";
</style>   