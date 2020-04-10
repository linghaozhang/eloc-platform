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
        <div class="eloc-CF-content-road-name" :style="overflowStyle">
          <div>道路名称</div>
          <div class="eloc-CF-content-road-name-inner">上江路</div>
        </div>
      </div>
      <div class="eloc-CF-content-form">
        <div class="eloc-CF-content-form-light">
          <div class="eloc-CF-content-form-vTitle">车道灯组信息编辑</div>
          <a-form layout="horizontal">
            <a-form-item label="车道序号" :label-col="{ span: 9 }" :wrapper-col="{ span: 15}">
              <a-input
                read-only
                placeholder="车道序号只读"
                v-model="formLaneNum"
                style="text-align:center"
              />
            </a-form-item>
            <a-form-item label="链接灯组" :label-col="{ span: 9 }" :wrapper-col="{ span: 15}">
              <a-input disabled />
            </a-form-item>
          </a-form>
        </div>
        <div class="eloc-CF-content-form-edit">
          <div class="eloc-CF-content-form-vTitle">车道灯组信息编辑</div>
          <a-form layout="inline">
            <a-form-item
              label="人行横道"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select defaultValue="0" style="width: 120px" @change="onSideWalkChange">
                <a-select-option value="0">无人行横道</a-select-option>
                <a-select-option value="1">一次行人</a-select-option>
                <a-select-option value="2">二次行人</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="安全岛"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="左转待转"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-select v-model="currentRoadData.wal" style="width: 120px" @change="onTurnleftChange">
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
              <a-select v-model="currentRoadData.was" style="width: 120px" @change="onStraightChange">
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
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="分隔带宽"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="提前调头"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="非机动车道"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="隔离形式"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              style="width:200px"
            >
              <a-input disabled />
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
export default {
  name: "elocChannelizationForm",
  data() {
    return {
      columns,
      tableData: data,
      roadDir: [],
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      wal:"0",
      was:"0"
    };
  },
  computed: {
    overflowStyle() {
      return this.roadDir.length > 5 ? "margin-top:15px" : "";
    },
    ...mapGetters(["formLaneNum","currentRoadData"]),
    formRoadDir: {
      get() {
        return this.$store.state.channelization.formRoadDir;
      },
      set(val) {
        this.$store.dispatch("channelization/setFormRoadDir", {
          formRoadDir: val
        });
      }
    }
  },
  mounted() {
    this.calcRoadDir();
    this.getCurrentRoad()
  },
  methods: {
    conversionDirNumber,
    calcRoadDir() {
      const road = this.$store.state.channelization.channelData[0].road;
      this.roadDir = road.map(i => ({
        value: i.number,
        label: this.conversionDirNumber(i.number)
      }));
      this.$store.dispatch("channelization/setFormRoadDir", {
        formRoadDir: this.roadDir[0].value
      });
      
    },
    getCurrentRoad(){
      const road = this.$store.state.channelization.channelData[0].road;
      let curRoad = road.filter(i=>i.number === this.formRoadDir)[0]
      this.$store.dispatch("channelization/setCurrentRoadData",{currentRoadData:{...curRoad}})
    },
    formRoadDirChange(e) {
      const road = this.$store.state.channelization.channelData[0].road;
      this.$store.dispatch("channelization/setFormRoadDir", {
        formRoadDir: e.target.value
      });
      let curRoad = road.filter(i=>i.number === this.formRoadDir)[0]
      this.$store.dispatch("channelization/setCurrentRoadData",{currentRoadData:{...curRoad}})
    },
    onStraightChange(){
      const channelData = this.$store.state.channelization.channelData;
      const current = {...this.currentRoadData}
      channelData[0].road.forEach(i=>{
        if(i.number === Number(this.formRoadDir)){
          i.was = current.was
        }
      })
      this.$store.dispatch('channelization/setChannelData',{channelData:[...channelData]})
      this.$store.dispatch("channelization/setCurrentRoadData",{currentRoadData:{...current}})
    },
    onTurnleftChange(){
      const channelData = this.$store.state.channelization.channelData;
      const current = {...this.currentRoadData}
      channelData[0].road.forEach(i=>{
        if(i.number === Number(this.formRoadDir)){
          i.wal = current.wal
        }
      })
      this.$store.dispatch('channelization/setChannelData',{channelData:[...channelData]})
      this.$store.dispatch("channelization/setCurrentRoadData",{currentRoadData:{...current}})
    },
    onSideWalkChange(v){
      console.log(v)
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>