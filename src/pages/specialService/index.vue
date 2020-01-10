<template>
  <div class="specialService">
    <div class="specialService-form">
      <a-form layout="inline">
        <a-form-item label="任务名称">
          <a-input
            placeholder="请输入任务级别"
            style="width:250px"
            v-model="vipName"
          />
        </a-form-item>
        <a-form-item label="任务级别">
          <a-select
            placeholder="请选择任务级别"
            :options="vipLevelOption"
            style="width:250px"
            v-model="vipLevel"
          />
        </a-form-item>
        <a-form-item label="任务起止时间">
          <a-range-picker
            :showTime="{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
                      }"
            format="YYYY-MM-DD HH:mm:ss"
            v-model="rangePickerValue"
          />
        </a-form-item>
        <a-form-item style="float:right">
          <a-button
            type="primary"
            style="margin-right:20px"
            @click="loadTable"
          >查询
          </a-button>
          <a-button @click="clearInput">清空</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="specialService-table">
      <div class="specialService-table-btns">
        <a-button icon="delete" type="danger" @click="confirmBatchDelete">批量删除</a-button>
        <a-button icon="edit" @click="edit">编辑</a-button>
        <a-button type="primary" icon="plus" @click="createTask">新建</a-button>
      </div>
      <a-table
        bordered
        :columns="columns"
        :dataSource="tableData"
        :loading="loading"
        rowKey="lineId"
        :pagination="false"
        :rowSelection="{onChange: onSelectChange}"
      >
        <template slot="lineStateLab" slot-scope="text,record">
          <a-badge :status="transformState(record).state" :text="transformState(record).text"/>
        </template>
        <template slot="handle" slot-scope="text,record">
          <div class="custom-slot-handle">
            <a-button size="small" icon="edit"></a-button>
            <a-button size="small" @click="confirmRowDelete(record)" type="danger" icon="delete"></a-button>
            <a-button size="small" type="primary" icon="play-circle" @click="implement(record)"></a-button>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import columns from './columns'
  import {getVipTask, deleteVipLine} from 'api/specialService'
  import {addRowSpanCount, routeCompReplace} from 'utils/utils'

  export default {
    name: 'specialService',
    data() {
      return {
        columns,
        vipLevel: undefined,
        rangePickerValue: [],
        vipName: '',
        vipLevelOption: [
          {label: '一级', value: '1'},
          {label: '二级', value: '2'},
          {label: '三级', value: '3'},
        ],

        tableData: [],
        loading: false,
        selectedRows: []
      }
    },
    mounted() {
      this.loadTable()
    },
    methods: {
      moment,
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRows = selectedRows
      },
      createTask() {
        routeCompReplace('taskDetail', {});
      },
      loadTable() {
        this.loading = true;
        const params = {
          vipLevel: this.vipLevel || '',
          vipName: this.vipName,
          vipStartTime: this.rangePickerValue[0] ? moment(this.rangePickerValue[0]).format('YYYY-MM-DD HH:mm:ss') : '',
          vipEndTime: this.rangePickerValue[1] ? moment(this.rangePickerValue[1]).format('YYYY-MM-DD HH:mm:ss') : ''
        };
        getVipTask(params).then(res => {
          this.tableData = addRowSpanCount(res.msg);
          this.loading = false;
        })
      },
      clearInput() {
        this.vipLevel = undefined;
        this.vipName = '';
        this.rangePickerValue = [];
      },
      implement(record){
        routeCompReplace('performTask', record);
      },
      edit() {
        console.log(this.selectedRows)
        if (this.selectedRows.length === 0) {
          return this.$error({title: '请选择需要编辑的任务'})
        }
        const ids = [this.selectedRows[0].vipId]
        const vipName = this.selectedRows[0].vipName
        routeCompReplace('taskDetail', {ids, vipName});
      },
      confirmBatchDelete() {
        if (this.selectedRows.length === 0) {
          return this.$error({title: "请选择需要删除的任务"})
        }
        const params = this.selectedRows.map(i => ({
          lineId: i.lineId,
          vipId: i.vipId
        }))
        this.$confirm({
          title:'确定删除选中的任务吗？',
          onOk:()=>{
            deleteVipLine(params).then(res => {
              if (res.code === 0) {
                this.loadTable()
              }
              if (res.code === 903) {
                this.$error({title:"不能删除执行中的特勤线路"})
              }
            })
          }
        })
      },
      confirmRowDelete(record) {
        this.$confirm({
          title: '是否删除该特勤任务？',
          content: `确定删除 ${record.vipName} 任务下的 ${record.lineName} 路线吗？`,
          onOk: () => {
            this.rowDelete(record)
          }
        })
      },
      rowDelete(record) {
        const params = [{
          lineId: record.lineId,
          vipId: record.vipId
        }]
        deleteVipLine(params).then(res => {
          if (res.code === 0) {
            this.loadTable()
          }
          if (res.code === 903) {
            this.$error({title:"不能删除执行中的特勤线路"})
          }
        })
      },
      transformState(record) {
        switch (record.lineState) {
          case '1':
            return {
              text: '未执行',
              state: 'error'
            }
          case '2':
            return {
              text: '执行中',
              state: 'processing'
            }
          case '3':
            return {
              text: '已执行',
              state: 'default'
            }
          default:
            return {
              text: '未知状态',
              state: 'warning'
            }
        }
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>
