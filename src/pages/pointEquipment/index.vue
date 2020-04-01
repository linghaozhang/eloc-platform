<template>
  <div class="pointEquipment">
    <div class="pointEquipment-form">
      <a-form layout="inline">
        <a-form-item label="点位信息">
          <a-input placeholder="请输入点位编号或名称" style="width:200px" v-model="crossInfo" />
        </a-form-item>
        <a-form-item label="行政区划">
          <a-select placeholder="请选择行政区划" :options="areaOption" style="width:200px" v-model="area" />
        </a-form-item>
        <a-form-item label="点位类型">
          <a-select
            placeholder="请选择点位类型"
            :options="slcKindOption"
            style="width:200px"
            v-model="slcKind"
          />
        </a-form-item>
        <a-form-item label="点位IP">
          <a-input placeholder="请输入点位IP" style="width:200px" v-model="crossIp" />
        </a-form-item>
        <a-form-item label="版本号">
          <a-input placeholder="请输入信号机版本号" style="width:200px" v-model="version" />
        </a-form-item>
        <a-form-item label="信号机状态" style="margin-top:20px">
          <a-select
            placeholder="请选择信号机状态"
            :options="slcStateOption"
            style="width:200px"
            v-model="slcState"
          />
        </a-form-item>
        <a-form-item label="检测器状态" style="margin-top:20px">
          <a-select
            placeholder="请选择检测器状态"
            :options="dectStateOption"
            style="width:200px"
            v-model="dectState"
          />
        </a-form-item>
        <a-form-item style="float:right;margin-top:20px">
          <a-button type="primary" @click="getCrossDevice">查询</a-button>
          <a-dropdown :trigger="['click']">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="createIntersection">路口</a-menu-item>
              <a-menu-item key="2">路测</a-menu-item>
            </a-menu>
            <a-button type="primary" style="margin-left: 10px">
              新增
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-button type="primary" style="margin-left: 10px" icon="arrow-down">导出</a-button>
          <a-popover trigger="hover">
            <template slot="content">{{clientTime || '前端设备升级'}}</template>
            <a-button style="margin-left: 10px" icon="desktop" @click="updateSlc">设备升级</a-button>
          </a-popover>
          <a-popover trigger="hover">
            <template slot="content">前端倒计时参数设置</template>
            <a-button style="margin-left: 10px" icon="clock-circle" @click="openCountDown">倒计时参数设置</a-button>
          </a-popover>
        </a-form-item>
      </a-form>
    </div>
    <div class="pointEquipment-table">
      <a-table
        bordered
        :columns="columns"
        size="small"
        :dataSource="tableData"
        :pagination="pagination"
        rowKey="count"
      ></a-table>
    </div>
    <a-modal
      :visible="visible"
      class="pointEquipment-modal"
      :width="720"
      :centered="true"
      okText="确定"
      @cancel="()=>visible=false"
      :destroyOnClose="true"
      @ok="onOk"
      :title="isUpdateSlc?'前端设备程序升级':'前端设备倒计时参数设置-点位选取'"
    >
      <div class="batch-operation-title">操作类型</div>
      <div class="batch-operation-object-content">
        <a-input-search
          style="width:280px"
          placeholder="请选择或输入信号机所属道路名称"
          @search="onSearch"
          enterButton
        />
        <div class="batch-operation-object-transfer">
          <div class="batch-operation-object-transfer-tree">
            <el-tree
              :data="batchTreeData"
              :props="defaultProps"
              show-checkbox
              highlight-current
              ref="pointEquipmentTree"
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <img
                  v-if="node.data.img"
                  class="custom-tree-node-img"
                  :src="switchMarkerImg(node.data.img)"
                  alt
                />
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
          <div class="batch-operation-object-transfer-btn">
            <a-button
              block
              @click="batchMoveRight"
              type="primary"
              shape="circle"
              icon="right"
              style="margin-bottom:15px"
            />
            <a-button block @click="batchMoveLeft" shape="circle" icon="left" />
          </div>
          <div class="batch-operation-object-transfer-result">
            <a-checkbox-group @change="batchCheckListChange">
              <div v-for="i in batchSelectList" :key="i.key" style="height:21px;margin-bottom:7px;">
                <a-checkbox :value="i.key">{{i.title}}</a-checkbox>
              </div>
            </a-checkbox-group>
          </div>
        </div>
        <div v-if="isUpdateSlc">
          <a-upload :action="baseUrl" :fileList="fileList" @change="uploadChange">
            <a-button type="primary" style="margin-top:10px">
              <a-icon type="upload" />点击上传前端信号机升级程序文件
            </a-button>
          </a-upload>
        </div>
      </div>
    </a-modal>
    <a-modal
      :visible="countDownVisible"
      class="countDown-modal"
      :width="720"
      :centered="true"
      okText="下载"
      @cancel="()=>countDownVisible=false"
      :destroyOnClose="true"
      @ok="onCountDownOk"
      title="前端设备倒计时参数设置-参数设置"
    >
      <div class="setParams-modal">
        <div class="setParams-modal-title">前端设备当前参数设置表</div>
        <a-table
          bordered
          size="small"
          :columns="countDownColumns"
          :dataSource="countDownTableData"
          rowKey="count"
          style="margin-bottom:10px"
        ></a-table>
        <div class="setParams-modal-title">前端设备当前参数设置表</div>
        <div class="setParams-modal-form">
          <a-form layout="inline" :form="form">
            <a-form-item label="模式选择">
              <a-select
                v-decorator="['countDownMode', { rules: [{ required: true, message: '请选择倒计时模式' }] }]"
                placeholder="请选择倒计时模式"
                :options="countDownModeOption"
                style="width:200px"
              />
            </a-form-item>
            <a-form-item label="脉冲宽度">
              <a-input
                v-decorator="['pulseCountDownTime', { rules: [{ required: true, message: '请输入脉冲宽度(10~50)' },{validator: validatePulseCountDownTime}] }]"
                placeholder="请输入脉冲宽度(10~50)"
                style="width:200px"
              />
            </a-form-item>
            <a-form-item label="方式选择">
              <a-select
                v-decorator="['countDownChioce', { rules: [{ required: !disabled, message: '请选择倒计时方式' }]}]"
                :disabled="disabled"
                placeholder="请选择倒计时方式"
                :options="countDownChioceOption"
                style="width:200px"
              />
            </a-form-item>
            <a-form-item label="手动脉冲宽度">
              <a-input
                placeholder="请输入手动脉冲宽度(0~20)"
                v-decorator="['manualPulseTime', { rules: [{ required: true, message: '请输入手动脉冲宽度(0~20)' },{validator: validateManualPulseTime}] }]"
                style="width:200px"
              />
            </a-form-item>
            <a-form-item label="时长选择">
              <a-input
                v-decorator="['countDownSec', { rules: [{ required: true, message: '请输入手动脉冲宽度(0~20)' },{validator: validateCountDownSec}] }]"
                placeholder="请输入倒计时长(0~90s)"
                style="width:200px"
                addonAfter="s"
              />
            </a-form-item>
            <a-form-item label="波特率">
              <a-select
                v-decorator="['baudRate', { rules: [{ required: !disabled, message: '请选择波特率' }]}]"
                :disabled="disabled"
                placeholder="请选择波特率"
                :options="baudRateOption"
                style="width:200px"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  getCrossDevice,
  getArea,
  getOtherParam,
  crossExcel,
  getCrossListInfo,
  updateSlcApi,
  getCountDownParameter,
  setCountDownParameter
} from "api/pointEquipment";
import { getCrossInfoByFuzzySearch } from "api/homePage";
import columns, { countDownColumns } from "./columns";
import { downloadFile, conversionTreeData, switchMarkerImg, routeCompReplace } from "utils/utils";
import { baseUrl } from "utils/constant";
import {
  validatePulseCountDownTime,
  validateManualPulseTime,
  validateCountDownSec
} from "utils/validator";
export default {
  name: "pointEquipment",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this, { name: "countDown-modal" }),
      baseUrl: baseUrl + "system/device/uploadFile",
      columns,
      countDownColumns,
      area: undefined,
      crossInfo: "",
      slcKind: undefined,
      crossIp: "",
      version: "",
      slcState: undefined,
      dectState: undefined,
      areaOption: [],
      clientTime: "",
      slcKindOption: [
        { label: "路口", value: "1" },
        { label: "路侧", value: "2" }
      ],
      slcStateOption: [
        { label: "在线-固定配时", value: "C01" },
        { label: "在线-感应控制", value: "C02" },
        { label: "在线-特勤", value: "C03" },
        { label: "在线-中心手动", value: "C04" },
        { label: "在线-现场手动", value: "C05" },
        { label: "在线-自适应", value: "C06" },
        { label: "异常", value: "C08" },
        { label: "脱机", value: "C10" }
      ],
      dectStateOption: [
        { label: "正常", value: "0001" },
        { label: "不正常", value: "0002" }
      ],
      tableData: [],
      pagination: {
        pageSize: 13,
        showQuickJumper: true
      },
      visible: false,
      batchTreeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      batchSelectList: [],
      removeBatchCheckList: [],
      fileList: [],
      uploadData: {},
      isUpdateSlc: false,
      countDownVisible: false,
      countDownTableData: [],
      disabled: true,
      countDownModeOption: [
        { label: "关闭", value: "0" },
        { label: "脉冲模式", value: "1" },
        { label: "通信模式(2004)", value: "2" },
        { label: "通信模式(2014)", value: "3" }
      ],
      countDownChioceOption: [
        { label: "绿灯倒计时", value: "1" },
        { label: "红灯倒计时", value: "2" },
        { label: "机动车倒计时", value: "3" },
        { label: "人行灯倒计时", value: "4" }
      ],
      countDownListMap:new Map(),
      baudRateOption: [
        { label: "2400bps", value: "2400" },
        { label: "4800bps", value: "4800" },
        { label: "9600bps", value: "9600" },
        { label: "19200bps", value: "19200" }
      ]
    };
  },
  mounted() {
    this.getCrossDevice();
    this.getAreaOption();
    this.getUpdateTime();
  },
  methods: {
    validatePulseCountDownTime,
    validateManualPulseTime,
    validateCountDownSec,
    createIntersection(){
      routeCompReplace('intersection')
    },
    getCrossDevice() {
      const params = {
        area: this.area ? this.area : "",
        slcState: this.slcState ? this.slcState : "",
        slcKind: this.slcKind ? this.slcKind : "",
        crossInfo: this.crossInfo,
        version: this.version,
        crossIp: this.crossIp,
        dectState: this.dectState
      };
      getCrossDevice(params).then(res => {
        console.log(res);
        this.tableData = res.msg.map((i, n) => ({
          ...i,
          count: n + 1
        }));
      });
    },
    getAreaOption() {
      getArea().then(res => {
        this.areaOption = res.msg.map(i => ({
          label: i.name,
          value: i.name
        }));
      });
    },
    getUpdateTime() {
      getOtherParam().then(({ msg }) => {
        if (msg && msg.otherParam) {
          this.clientTime = `前端设备升级,允许升级时间:${msg.otherParam.startTime}-${msg.otherParam.endTime}`;
        }
      });
    },
    downloadExcel() {
      const params = {
        crossInfo: this.crossInfo,
        area: this.area,
        slcState: this.slcState,
        slcKind: this.slcKind,
        version: this.version,
        crossIp: this.crossIp
      };
      crossExcel(params).then(stream => {
        downloadFile("点位设备信息记录.xls", stream);
      });
    },
    switchMarkerImg(src) {
      return switchMarkerImg(src).t;
    },
    batchCheckListChange(v) {
      this.removeBatchCheckList = [...v];
    },
    batchMoveRight() {
      this.batchSelectList = this.$refs.pointEquipmentTree
        .getCheckedNodes()
        .filter(i => !i.children);
    },
    batchMoveLeft() {
      const cache = this.batchSelectList.filter(
        i => this.removeBatchCheckList.indexOf(i.key) === -1
      );
      this.batchSelectList = [...cache];
    },
    onSearch(key) {
      const params = { crossInfo: key };
      getCrossInfoByFuzzySearch(params).then(res => {
        if (res.code !== 0) {
          return false;
        }
        this.batchTreeData = conversionTreeData(res.msg);
      });
    },
    updateSlc() {
      this.onSearch("");
      this.visible = true;
      this.batchSelectList = [];
      this.fileList = [];
      this.isUpdateSlc = true;
    },
    openCountDown() {
      this.onSearch("");
      this.visible = true;
      this.batchSelectList = [];
      this.isUpdateSlc = false;
    },
    uploadChange(info) {
      let fileList = [...info.fileList];
      let { response } = info.file;
      if (response) {
        this.uploadData.fileUrl = response.result.url;
        this.uploadData.fileName = response.result.fileName;
      }
      if (fileList.length > 1) {
        fileList = fileList.slice(-1);
      }
      this.fileList = fileList;
    },
    updateSlcSubmit() {
      console.log(this.batchSelectList);
      if (this.batchSelectList.length === 0) {
        return this.$error({ title: "至少选中一个路口" });
      }
      if (!this.uploadData.fileUrl) {
        return this.$error({ title: "请选择升级程序" });
      }
      const params = this.batchSelectList.map(i => i.crossNo);
      getCrossListInfo(params)
        .then(res => {
          let crossInfoList = [];
          res.msg.forEach(i => {
            if (i.slcKind === "2") {
              crossInfoList.push(i);
            }
          });
          return crossInfoList;
        })
        .then(list => {
          const params = {
            fileName: this.uploadData.fileName,
            fileUrl: this.uploadData.fileUrl,
            crossNoList: list.map(i => i.crossNo).toString()
          };
          updateSlcApi(params).then(res => {
            if (res.msg) {
              const result = res.msg.filter(i => {
                i.result === "error";
              });
              if (result.length > 0) {
                this.$error({
                  title:
                    result.map(i => `${i.crossNo}-${i.crossId}`).join(",") +
                    "执行失败"
                });
              } else {
                this.$success({ title: "执行成功" });
              }
            }
          });
        });
    },
    countDownSubmit() {
      this.visible = false;
      this.countDownVisible = true;
      const params = this.batchSelectList.map(i => i.crossNo);
      let errorInfo = [];
      getCrossListInfo(params).then(res => {
        const data = res.msg;
        data.forEach(i => {
          this.countDownListMap.set(i.crossNo, i);
          if (i.slcKind === "2") this.disabled = false;
        });
      });
      getCountDownParameter(params).then(({ msg }) => {
        if (!msg) {
          return false;
        }
        let countDownTableData = [];
        msg.forEach(i => {
          if (i.result === "success") {
            countDownTableData.push({
              crossNo: i.crossNo,
              crossName:
                this.countDownListMap.get(i.crossNo).crossId + "-" + this.countDownListMap.get(i.crossNo).crossName,
              slcKind: this.countDownListMap.get(i.crossNo).slcKind,
              countDownMode: i.msg ? i.msg.countDownMode : null,
              countDownSec: i.msg ? i.msg.countDownSec : null,
              manualPulseTime: i.msg ? i.msg.manualPulseTime : null,
              pulseCountDownTime: i.msg ? i.msg.pulseCountDownTime : null,
              baudRateMode: i.msg ? i.msg.baudRateMode : null,
              countDownType: i.msg ? i.msg.countDownType : null
            });
          } else {
            errorInfo.push(
              this.countDownListMap.get(i.crossNo).crossId + "-" + this.countDownListMap.get(i.crossNo).crossName
            );
          }
        });
        if (errorInfo.length > 0) {
          this.$error({ title: `${errorInfo.join(",")}执行失败` });
        }
        this.countDownTableData = [...countDownTableData];
      });
    },
    prepareCountDownData(value) {
      let countDownList = [];
      let crossNoListSLC3 = [],
        crossNoListSLC4 = [];
      this.countDownTableData.forEach(i => {
        if (i.slcKind === "1") {
          crossNoListSLC3.push(i.crossNo);
        }
        if (i.slcKind === "2") {
          crossNoListSLC4.push(i.crossNo);
        }
      });
      if (crossNoListSLC3.length > 0) {
        countDownList.push({
          crossNoList: crossNoListSLC3,
          countDownMode: value.countDownMode,
          pulseCountDownTime: value.pulseCountDownTime,
          manualPulseTime: value.manualPulseTime,
          countDownSec: value.countDownSec,
          countDownType: value.countDownChioce,
          baudRateMode: value.baudRate,
          slcType: "1"
        });
      }
      if (crossNoListSLC4.length > 0) {
        countDownList.push({
          crossNoList: crossNoListSLC4,
          countDownMode: value.countDownMode,
          pulseCountDownTime: value.pulseCountDownTime,
          manualPulseTime: value.manualPulseTime,
          countDownSec: value.countDownSec,
          countDownType: value.countDownChioce,
          baudRateMode: value.baudRate,
          slcType: "2"
        });
      }
      setCountDownParameter(countDownList).then(res=>{
        if(res.msg){
        let errorCross = []
          res.msg.forEach(i=>{
            if(i.result === 'error'){
              errorCross.push(this.countDownListMap.get(i.crossNo).crossId+"-"+this.countDownListMap.get(i.crossNo).crossName);
            }
          })
          if(errorCross.length>0){
            this.$error({title:errorCross.join(",")+"执行失败"})
          }else{
            this.$success({title:'倒计时参数设置成功'})
          }
        }
      })
    },
    onCountDownOk() {
      this.form.validateFields((err, val) => {
        if (err) return false;
        this.$confirm({
          title: "是否下载倒计时参数？",
          onOk: () => this.prepareCountDownData(val)
        });
      });
    },
    onOk() {
      if (this.batchSelectList.length === 0) {
        return this.$error({ title: "至少选中一个路口" });
      }
      if (this.isUpdateSlc) {
        this.updateSlcSubmit();
      } else {
        this.countDownSubmit();
      }
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>
