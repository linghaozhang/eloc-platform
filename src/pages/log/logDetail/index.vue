<template>
  <div class="elocLog-detail">
    <div class="elocLog-detail-title">
      {{crossName}}
      <a-button style="float:right" @click="returnLog">返回</a-button>
    </div>
    <div class="elocLog-detail-content">
      <div class="elocLog-detail-tableChart-top">
        <span>方案运行记录详情</span>
        <div class="tableChart-top-group">
          <a-button
            style="margin-right:10px"
            size="large"
            type="primary"
            icon="download"
            @click="exportExcel"
          ></a-button>
          <a-button
            style="margin-right:10px"
            size="large"
            icon="table"
            :type="showTable?'primary':'default'"
            @click="loadTable"
          ></a-button>
          <a-button
            size="large"
            icon="bar-chart"
            :type="showTable?'default':'primary'"
            @click="loadChart"
          ></a-button>
        </div>
      </div>
      <div class="elocLog-detail-content-table" v-show="showTable">
        <a-table
          bordered
          :columns="columns"
          :dataSource="tableData"
          :loading="loading"
          rowKey="key"
          :pagination="pagination"
          size="middle"
        >
          <template slot="runtime" slot-scope="text,record">
            <div>{{`${record.startTime}~${record.endTime}`}}</div>
          </template>
        </a-table>
      </div>
      <div class="elocLog-detail-content-chart" v-show="!showTable">
        <v-chart id="elocLogDetailChart" :manual-update="true" ref="elocLogDetailChart" />
      </div>
    </div>
  </div>
</template>
<script>
import { getRouteCompParams, routeCompReplace } from "utils/utils";
import columns from "./columns";
import {
  getLogTableDetailData,
  exportExcel,
  getLogChartDetail,
  getLogChartDetailData
} from "api/log";
import { xxbh } from "utils/constant";
import { options } from "./chartOptions";

export default {
  data() {
    return {
      columns: columns,
      crossName: "",
      crossNo: "",
      showTable: true,
      loading: false,
      tableData: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 13
      },
      params: {},
      isLoaded: false
    };
  },
  beforeMount() {
    this.getParams();
  },
  methods: {
    getParams() {
      const params = getRouteCompParams();
      this.crossName = params.crossName;
      this.params = params;
      this.loadTable();
    },
    loadTable() {
      this.showTable = true;
      if (this.tableData.length === 0) {
        this.loading = true;
        let params = {
          crossNo: this.params.crossNo,
          startDateTime: this.params.startDateTime,
          endDateTime: this.params.endDateTime
        };
        getLogTableDetailData(params).then(res => {
          this.tableData = res.msg.dataList.map((i, n) => {
            i.key = n;
          });
          this.loading = false;
        });
      }
    },
    loadChart() {
      this.showTable = false;
      if (this.isLoaded) {
        return false;
      }
      const params = {
        crossNo: this.params.crossNo,
        startDateTime: this.params.startDateTime,
        endDateTime: this.params.endDateTime
      };
      getLogChartDetailData(params)
        .then(res => {
          if (res) {
            this.$refs.elocLogDetailChart.mergeOptions(options(res.msg));
          }
        })
        .then(() => {
          getLogChartDetail(params).then(res => {
            let seriesOption = {};
            seriesOption.series = [];
            seriesOption.legend = {};
            seriesOption.legend.data = [];
            seriesOption.legend.selectedMode = false;
            for (var i = 0; i < res.msg.length; i++) {
              for (var ii = 0; ii < res.msg[i].length; ii++) {
                if (
                  res.msg[i][ii][0] &&
                  res.msg[i][ii][1] &&
                  res.msg[i][ii][2]
                ) {
                  let opt = {
                    name: xxbh[i],
                    data: res.msg[i],
                    type: "custom"
                  };
                  seriesOption.series.push(opt);
                  seriesOption.legend.data.push(xxbh[i]);
                  break;
                }
              }
              if (ii + 1 === res.msg[i].length) {
                break;
              }
            }
            this.$refs.elocLogDetailChart.mergeOptions(seriesOption);
            this.isLoaded = true;
          });
        });
    },
    returnLog() {
      routeCompReplace("log");
    },
    exportExcel() {
      let params = {
        controlMode: this.params.controlMode || undefined,
        crossName: this.params.formCrossName || undefined,
        startDateTime: this.params.startDateTime,
        endDateTime: this.params.endDateTime,
        crossNo: this.params.crossNo,
        crossType: this.params.crossType || undefined
      };
      exportExcel(params).then(res => {
        console.log(res);
        const blob = new Blob([res]);
        const downloadElement = document.createElement("a");
        downloadElement.style.display = "none";
        const href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = "方案运行记录.xlsx"; //下载后文件名
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