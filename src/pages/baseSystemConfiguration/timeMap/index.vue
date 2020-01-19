<template>
  <div class="bscTimeMap" id="bscTimeMap">
    <div class="bscTimeMap-form">
      <a-form layout="inline">
        <a-form-item label="上次自动校时">
          <a-input v-model="lastAutomaticTiming" read-only></a-input>
        </a-form-item>
        <a-form-item>
          <a-select
            :options="timeRateOptions"
            v-model="timeRate"
            placeholder="请选择自动校时频率/小时"
            style="width:230px;"
          ></a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="saveTimeRate">保存</a-button>
        </a-form-item>
        <a-form-item label="上次自动校时">
          <a-input v-model="lastManualProofreading" read-only></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onBatch">立即手动校时</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="bscTimeMap-tableMap">
      <div class="bscTimeMap-table">
        <a-table
          bordered
          rowKey="count"
          :dataSource="tableData"
          :columns="columns"
          size="small"
          :pagination="pagination"
        >
          <template slot="centerPoint" slot-scope="text,record">
            <div
              style="cursor:pointer"
              @click="showPoint(record)"
            >{{record.pointX&&record.pointY ? `${record.pointX}，${record.pointY}`: ''}}</div>
          </template>
          <template slot="operate" slot-scope="text,record">
            <div class="operate-button">
              <a-button @click="editPoint(record)" icon="edit" type="primary" size="small"></a-button>
            </div>
          </template>
        </a-table>
      </div>
      <div class="bscTimeMap-map">
        <eloc-map @getMapContext="getMapContext" ref="baseSysConfigMap" mapId="baseSysConfigMap"></eloc-map>
      </div>
    </div>
    <a-modal
      :visible="visible"
      class="timeMap-modal"
      :width="720"
      :centered="true"
      okText="确认手动校时"
      @cancel="()=>visible=false"
      :destroyOnClose="true"
      @ok="onOk"
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
              ref="timeMapTree"
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
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  initProofreading,
  getCaliTime,
  updateCrossSlcTime,
  setCrossSlcTime,
} from "api/systemConfiguation";
import columns from "./columns";
import { ElocMap } from "components/common";
import { getCrossInfoByFuzzySearch } from "api/homePage";
import { conversionTreeData, switchMarkerImg } from "utils/utils";
import {addSystemOperLog} from 'api'
export default {
  components: {
    ElocMap
  },
  data() {
    return {
      columns,
      timeRateOptions: [
        { label: "2h", value: "1" },
        { label: "4h", value: "2" },
        { label: "6h", value: "3" },
        { label: "8h", value: "4" },
        { label: "12h", value: "5" },
        { label: "48h", value: "6" }
      ],
      timeRate: undefined,
      lastAutomaticTiming: "",
      lastManualProofreading: "",
      tableData: [],
      mapContext: "",
      pagination: {
        pageSize: 14
      },
      point: null,
      drawTool: null,
      visible: false,
      batchTreeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      batchSelectList: [],
      removeBatchCheckList: []
    };
  },
  mounted() {
    this.getTableData();
    this.getFormData();
    this.initMapConfiguration();
  },
  methods: {
    getTableData() {
      initProofreading().then(res => {
        this.tableData = res.msg.map((i, n) => ({ ...i, count: n + 1 }));
      });
    },
    getFormData() {
      getCaliTime().then(({ msg }) => {
        msg.forEach(i => {
          if (i.itemId === "100") this.lastAutomaticTiming = i.itemValue;
          if (i.itemId === "101") this.lastManualProofreading = i.itemValue;
          if (i.itemId !== "100" && i.itemId !== "101" && i.itemValue)
            this.timeRate = i.itemValue;
        });
      });
    },
    saveTimeRate() {
      const params = {
        itemId: "102",
        itemValue: this.timeRate
      };
      updateCrossSlcTime(params).then(res => {
        if (res.code === 0) {
          this.$success({ title: "保存成功" });
        }
      });
    },
    getMapContext(mapContext) {
      this.mapContext = mapContext;
    },
    initMapConfiguration() {
      this.$refs.baseSysConfigMap.initElocMap();
    },
    showPoint(record) {
      if (!record.pointX || !record.pointY) return false;
      if (this.point) {
        window.gis.OverlayUtil.removeOverlay(this.point);
        this.point = null;
      }
      this.point = window.gis.OverlayUtil.createMarker(
        record.pointX,
        record.pointY,
        null,
        {}
      ).addTo(this.mapContext.map);
      this.mapContext.panTo(record.pointX, record.pointY);
    },
    editPoint(record) {
      let cache = [...this.tableData];
      if (this.point) {
        window.gis.OverlayUtil.removeOverlay(this.point);
        this.point = null;
      }
      if (this.drawTool) {
        this.drawTool.setDrawingMode("point");
      } else {
        this.drawTool = new window.gis.DrawingUtil(this.mapContext, {
          callback: e => {
            if (this.drawTool._options.drawingMode == "point") {
              cache.forEach(i => {
                if (
                  i.count === record.count &&
                  i.organizationName === record.organizationName
                ) {
                  i.pointX = e.latlng.lng;
                  i.pointY = e.latlng.lat;
                }
              });
            }
            this.tableData = [...cache];
            this.drawTool.close();
            this.point = window.gis.OverlayUtil.createMarker(
              e.latlng.lng,
              e.latlng.lat,
              null,
              {}
            ).addTo(this.mapContext.map);
          },
          drawingMode: "point"
        });
      }
      this.drawTool.open();
    },
    switchMarkerImg(src) {
      return switchMarkerImg(src).t;
    },
    batchMoveRight() {
      this.batchSelectList = this.$refs.timeMapTree
        .getCheckedNodes()
        .filter(i => !i.children);
    },
    batchMoveLeft() {
      const cache = this.batchSelectList.filter(
        i => this.removeBatchCheckList.indexOf(i.key) === -1
      );
      this.batchSelectList = [...cache];
    },
    batchCheckListChange(v) {
      this.removeBatchCheckList = [...v];
    },
    onBatch() {
      this.onSearch("");
      this.visible = true;
      this.batchSelectList = [];
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
    onOk() {
      if (this.batchSelectList.length === 0) {
        return this.$error({ title: "至少选中一个路口" });
      }
      const crossNo = this.batchSelectList.map(i => i.crossNo);
      setCrossSlcTime(crossNo)
        .then(res => {
          if (res.code === 0) {
            return {
              itemId: "101",
              itemValue: null
            };
          }
        })
        .then(updateCaliTime => {
          updateCrossSlcTime(updateCaliTime).then(res => {
            if (res.code === 0) {
              this.$success({ title: "校时成功" });
              this.getTableData();
              this.getFormData();
              this.visible = false
            }else{
              this.$error({ title: "校时失败" });
            }
            return res.code
          }).then(code=>{
            // 添加日志
            const params = {
              operName:'U32',
              operContent:'手动校时',
              operResult:code===0?1:0,
              userName:this.$store.state.appMain.userInfo.userName,
              operDetail:''
            }
            crossNo.forEach(i=>{
              params.operObject = i
              addSystemOperLog(params)
            })
          });
        });
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>