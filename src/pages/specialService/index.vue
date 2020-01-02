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
        <a-button icon="delete" type="danger">批量删除</a-button>
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
        <template slot="lineStateLab" slot-scope="text, record">
          <a-badge :status="transformState(record).state" :text="transformState(record).text"/>
        </template>
        <template slot="handle">
          <div class="custom-slot-handle">
            <a-button size="small" icon="edit"></a-button>
            <a-button size="small" type="danger" icon="delete"></a-button>
            <a-button size="small" type="primary" icon="play-circle"></a-button>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import columns from './columns'
  import {getVipTask} from 'api/specialService'
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
        routeCompReplace('taskDetail');
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
          console.log(res);
          this.loading = false;
        })
      },
      clearInput() {
        this.vipLevel = undefined;
        this.vipName = '';
        this.rangePickerValue = [];
      },
      edit(){
        console.log(this.selectedRows)
        const ids = [this.selectedRows[0].vipId]
        routeCompReplace('taskDetail',ids);
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
