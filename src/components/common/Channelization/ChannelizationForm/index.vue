<template>
  <!--eloc channelization form -->
  <div class="eloc-CF">
    <div class="eloc-CF-title">道路交通渠化信息</div>
    <div class="eloc-CF-content">
      <div class="eloc-CF-content-road">
        <div class="eloc-CF-content-road-label">道路方向</div>
        <div class="eloc-CF-content-road-radio">
          <a-radio-group buttonStyle="solid" v-model="formRoadDir" @change="formRoadDirChange">
            <a-radio-button :value="i.value" v-for="i in roadDir" :key="i.value">{{i.label}}</a-radio-button>
          </a-radio-group>
        </div>
        <div class="eloc-CF-content-road-name">
          <div>道路名称</div>
          <a-input
            style="width:130px;margin-left:15px;text-align:center"
            v-model="currentRoadData.crossname"
            @change="onCrossNameChange"
            placeholder="请输入道路名称"
          />
        </div>
      </div>
      <div class="eloc-CF-content-form">
        <div class="eloc-CF-content-form-light">
          <div class="eloc-CF-content-form-vTitle">车流端子配置</div>
          <a-form layout="horizontal" style="margin-top:10px;">
            <a-form-item label="车道序号" :label-col="{ span: 9 }" :wrapper-col="{ span: 15}">
              <a-input
                read-only
                placeholder="车道序号只读"
                v-model="formLaneNum"
                style="text-align:center;width: 150px"
              />
            </a-form-item>
            <a-form-item label="链接灯组" :label-col="{ span: 9 }" :wrapper-col="{ span: 15}">
              <a-select
                v-model="formConnectionTerminal"
                style="width: 150px"
                @change="onConnectionTerminalChange"
                :options="lampGroupOptions"
                :disabled="formConnectionTerminal === ''"
              ></a-select>
            </a-form-item>
          </a-form>
        </div>
        <div class="eloc-CF-content-form-edit">
          <div class="eloc-CF-content-form-vTitle">路口渠化</div>
          <a-form layout="inline" style="margin-left:10px;">
            <a-form-item
              label="人行横道"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.sidewalk"
                style="width: 120px"
                @change="onSideWalkChange"
              >
                <a-select-option value="0">无人行横道</a-select-option>
                <a-select-option value="1">一次行人</a-select-option>
                <a-select-option value="2">二次行人</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="左转待转"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.wal"
                style="width: 120px"
                @change="onTurnleftChange"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="直行待行"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.was"
                style="width: 120px"
                @change="onStraightChange"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="右转渠化"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="分隔形式"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.median"
                style="width: 120px"
                @change="onMedianChange"
              >
                <a-select-option value="0">单黄线</a-select-option>
                <a-select-option value="1">双黄线</a-select-option>
                <a-select-option value="2">护栏</a-select-option>
                <a-select-option value="3">绿化带</a-select-option>
                <a-select-option value="4">黄色斜线</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="提前调头"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.earlyTurn"
                style="width: 120px"
                @change="onEarlyTurnChange"
              >
                <a-select-option value="0">否</a-select-option>
                <a-select-option value="1">是</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="非机动车道"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select v-model="currentRoadData.nmvl" style="width: 120px" @change="onNmvlChange">
                <a-select-option value="0">否</a-select-option>
                <a-select-option value="1">是</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="隔离形式"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select
                v-model="currentRoadData.sfnmvl"
                :disabled="currentRoadData.nmvl==='0'"
                style="width: 120px"
                @change="onSfnmvlChange"
              >
                <a-select-option value="3">划线</a-select-option>
                <a-select-option value="4">护栏</a-select-option>
                <a-select-option value="5">绿化带</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <div class="eloc-CF-title" style="margin:0">车辆检测设备信息</div>
    <div class="eloc-CF-content" style="margin-bottom:0">
      <div class="eloc-CF-content-table">
        <a-table
          :loading="false"
          :columns="columns"
          size="small"
          bordered
          :dataSource="tableData"
          :pagination="false"
        ></a-table>
      </div>
    </div>
    <div class="eloc-CF-title" style="margin:0">监控设备信息</div>
    <div class="eloc-CF-content" style="margin-bottom:0;border-bottom:none">
      <div class="eloc-CF-content-table">
        <a-table
          :loading="false"
          :columns="columns"
          size="small"
          bordered
          :dataSource="tableData"
          :pagination="false"
        ></a-table>
      </div>
    </div>
  </div>
</template>
<script>
const data = [
  {
    key: "1",
    passNo: "1",
    roadNo: "2",
    passType: "一般检测器",
    deteType: "雷达检测器",
    deteName: "群里第一大道与上江路（北）",
    ip: "192.168.123.123",
    trafficType: "北左转"
  },
  {
    key: "2",
    passNo: "1",
    roadNo: "2",
    passType: "一般检测器",
    deteType: "雷达检测器",
    deteName: "群里第一大道与上江路（北）",
    ip: "192.168.123.123",
    trafficType: "北左转"
  },
  {
    key: "3",
    passNo: "1",
    roadNo: "2",
    passType: "一般检测器",
    deteType: "雷达检测器",
    deteName: "群里第一大道与上江路（北）",
    ip: "192.168.123.123",
    trafficType: "北左转"
  }
];

import { columns } from "./columns";
import { conversionDirNumber } from "utils/utils";
import { mapGetters } from "vuex";
import { connectionTerminalOptions } from "utils/constant";
export default {
  name: "elocChannelizationForm",
  data() {
    return {
      columns,
      lampGroupOptions: connectionTerminalOptions,
      tableData: data,
      roadDir: [],
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      wal: "0",
      was: "0"
    };
  },
  computed: {
    ...mapGetters(["formLaneNum", "currentRoadData"]),
    formRoadDir: {
      get() {
        return this.$store.state.channelization.formRoadDir;
      },
      set(val) {
        this.$store.dispatch("channelization/setFormRoadDir", {
          formRoadDir: val
        });
      }
    },
    formConnectionTerminal: {
      get() {
        return this.$store.state.channelization.formConnectionTerminal;
      },
      set(val) {
        this.$store.dispatch("channelization/setFormConnectionTerminal", {
          formConnectionTerminal: val
        });
      }
    }
  },
  mounted() {
    this.calcRoadDir();
    this.getCurrentRoad();
  },
  methods: {
    conversionDirNumber,
    calcRoadDir() {
      // 计算表单应该显示的路口方向
      const road = this.$store.state.channelization.channelData[0].road;
      this.roadDir = road.map(i => ({
        value: i.number,
        label: this.conversionDirNumber(i.number)
      }));
      this.$store.dispatch("channelization/setFormRoadDir", {
        formRoadDir: this.roadDir[0].value
      });
    },
    getCurrentRoad() {
      // 获得焦点路口数据
      const road = this.$store.state.channelization.channelData[0].road;
      let curRoad = road.filter(i => i.number === this.formRoadDir)[0];
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...curRoad }
      });
    },
    formRoadDirChange(e) {
      // 表单路口改变逻辑
      const road = this.$store.state.channelization.channelData[0].road;
      this.$store.dispatch("channelization/setFormRoadDir", {
        formRoadDir: e.target.value
      });
      let curRoad = road.filter(i => i.number === this.formRoadDir)[0];
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...curRoad }
      });
    },
    commonChange(valKey) {
      const channelData = this.$store.state.channelization.channelData;
      const current = { ...this.currentRoadData };
      channelData[0].road.forEach(i => {
        if (i.number === Number(this.formRoadDir)) {
          i[valKey] = current[valKey];
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...current }
      });
    },
    onStraightChange() {
      // 直行待行逻辑
      this.commonChange("was");
    },
    onTurnleftChange() {
      // 左转待转逻辑
      this.commonChange("wal");
    },
    onSideWalkChange() {
      // 人行横道改变逻辑
      this.commonChange("sidewalk");
    },
    onMedianChange() {
      this.commonChange("median");
    },
    onCrossNameChange() {
      this.commonChange("crossname");
    },
    onConnectionTerminalChange(v) {
      const index = this.$store.state.channelization.selectorDataPosition.index;
      console.log(index);
      const channelData = this.$store.state.channelization.channelData;
      channelData[0].road.forEach(i => {
        if (i.number === Number(this.formRoadDir)) {
          i.rri[index].jxid = v;
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
    },
    onNmvlChange(v) {
      const channelData = this.$store.state.channelization.channelData;
      const current = { ...this.currentRoadData };
      // 出口道第一条车道
      current.rli[0].rml = v === "0" ? "2" : "3";
      // 进口道第二条车道
      current.rri[current.rri.length - 2].rml = v === "0" ? "0" : "3";
      // 设置地标
      current.rri[current.rri.length - 1].fx = v === "0" ? "13" : "0";
      current.nmvl = v;
      // 设置非机动车道线
      current.sfnmvl = "3";

      channelData[0].road.forEach(i => {
        if (i.number === Number(this.formRoadDir)) {
          i = { ...current };
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...current }
      });
    },
    onSfnmvlChange(v) {
      const channelData = this.$store.state.channelization.channelData;
      const current = { ...this.currentRoadData };
      current.rli[0].rml = v;
      current.rri[current.rri.length - 2].rml = v;
      current.sfnmvl = v;
      channelData[0].road.forEach(i => {
        if (i.number === Number(this.formRoadDir)) {
          i = { ...current };
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...current }
      });
    },
    onEarlyTurnChange() {
      this.commonChange("earlyTurn");
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>