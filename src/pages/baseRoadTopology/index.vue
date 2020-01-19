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
      <a-table
        bordered
        rowKey="count"
        :columns="columns"
        size="small"
        :dataSource="tableData"
        :loading="loading"
        :pagination="pagination"
      >
        <template slot="operate" slot-scope="text,record">
          <div class="baseRoadTopology-table-custom">
            <a-button type="primary" icon="edit" @click="editTable(record)" size="small"></a-button>
            <a-button type="danger" icon="delete" size="small" @click="onDelete(record)"></a-button>
          </div>
        </template>
      </a-table>
    </div>
    <a-modal
      :visible="visible"
      :title="edit?'编辑路段信息':'新增路段信息'"
      :width="850"
      @cancel="onCancel"
      @ok="onOk"
      :destroyOnClose="true"
      :maskClosable="false"
    >
      <topology-modal ref="brtModal" :isEdit="edit" :roadSectionNo="roadSectionNo" />
    </a-modal>
    <a-modal :visible="deleteVisible" :width="450" :footer="null">
      <div style="padding: 32px 32px 24px;">
        <a-icon style="color: #faad14;font-size:22px;margin-right:16px;" type="question-circle" />
        <span style="color: rgba(0, 0, 0, 0.85);font-weight: 500;font-size: 16px;">{{isDeleteReserve?"请选择删除路段":"是否确定删除该路段？"}}</span>
      </div>
      <div style="overflow:hidden">
          <a-button style="float:right;margin-right:10px;" @click="onDeleteCancel">取消</a-button>
          <a-button type="primary" @click="deleteBrt" style="margin-right:10px;float:right">{{isDeleteReserve?"仅删除本路段":"删除"}}</a-button>
          <a-button type="primary" @click="deleteReserveBrt" style="margin-right:10px;float:right" v-if="isDeleteReserve">删除本路段及反向路段</a-button>
        </div>
    </a-modal>
  </div>
</template>
<script>
import ElocSelect from "components/common/ElocSelect";
import columns from "./columns";
import {
  getRoadTopologyInfo,
  getCrossNoById,
  saveTopologyInfo,
  getRoadTopologyExcel,
  getRoadTopologyInfoByNo,
  deleteBRT
} from "api/roadTopology";
import TopologyModal from "components/baseRoadTopology/TopologyModal";
import { downloadFile } from "utils/utils";

export default {
  name: "baseRoadTopology",
  data() {
    return {
      columns,
      pagination: { pageSize: 13 },
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
      tableData: [],
      visible: false,
      edit: false,
      roadSectionNo: "",
      deleteVisible: false,
      isDeleteReserve: false,
      deleteRoadRoadSectionNo:""
    };
  },
  components: {
    ElocSelect,
    TopologyModal
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
          this.tableData = res.msg.map((i, n) => ({ ...i, count: n + 1 }));
          this.loading = false;
        });
      });
    },
    onCreate() {
      this.roadSectionNo = "";
      this.edit = false;
      this.visible = true;
    },
    onDeleteCancel(){
      this.deleteVisible = false
    },
    onDelete(record) {
      const {roadSectionNo} = record;
      this.deleteRoadRoadSectionNo = roadSectionNo
      getRoadTopologyInfoByNo({roadSectionNo}).then(res=>{
        if(res.msg.hasReverse ==='1'){
          this.isDeleteReserve= true
        }else{
          this.isDeleteReserve= false
        }
        this.deleteVisible = true
      })
    },
    deleteBrt(){
      deleteBRT({roadSectionNo:this.deleteRoadRoadSectionNo}).then(res=>{
        if(res.code === 0){
          this.deleteVisible = false
          this.$success({title:'删除成功'})
          this.getTableData()
        }else{
          this.$error({title:'删除失败'})
        }
      })
    },
    deleteReserveBrt(){
      getRoadTopologyInfoByNo({roadSectionNo:this.deleteRoadRoadSectionNo}).then(({msg})=>{
        const beginCrossNo = msg.beginCrossNo === 'IIII'?'OOOO':msg.beginCrossNo
        const endCrossNo = msg.endCrossNo === 'OOOO'?'IIII':msg.endCrossNo
        const reverseRoadNo = endCrossNo + msg.endCrossEntry.substr(4, 1) + "2"+ beginCrossNo + msg.beginCrossExit.substr(4, 1) + "1";
        return reverseRoadNo
      }).then(reverseRoadNo => {
        const aysnc = [deleteBRT({roadSectionNo:this.deleteRoadRoadSectionNo}),deleteBRT({roadSectionNo:reverseRoadNo})]
        Promise.all(aysnc).then(res=>{
          if(res[0].code === 0 && res[1].code=== 0){
            this.deleteVisible = false
            this.getTableData()
            this.$success({title:'删除成功'})
          }else{
            this.$error({title:'删除失败'})
          }
        })
      })
    },
    onDownload() {
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
        getRoadTopologyExcel(params).then(stream => {
          downloadFile("路网拓扑信息记录.xls", stream);
        });
      });
    },
    clear() {
      this.startInfo = "";
      this.endInfo = "";
      this.roadSectionLevel = undefined;
    },
    onCancel() {
      this.visible = false;
    },
    onOk() {
      const fields = this.$refs.brtModal.getAllFields();
      if (!fields) return false;
      fields.then(params => {
        if (
          params[0].hasReverse &&
          params[0].roadSectionLength !== params[1].roadSectionLength
        ) {
          this.$confirm({
            title: "正反向路段长度不一致，是否保存？",
            onOk: () => this.save(params)
          });
        } else {
          this.save(params);
        }
      });
    },
    save(params) {
      let success = true;
      const async = params.map(i => saveTopologyInfo(i));
      Promise.all(async)
        .then(res => {
          res.forEach(i => {
            if (i.code !== 0) {
              success = false;
            }
          });
        })
        .then(() => {
          this.$success({ title: success ? "保存成功" : "保存失败" });
          this.getTableData();
        });
    },
    editTable(record) {
      this.roadSectionNo = record.roadSectionNo;
      this.edit = true;
      this.visible = true;
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>
