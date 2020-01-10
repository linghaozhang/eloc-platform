<template>
  <div class="elocLog">
    <div class="elocLog-form">
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
        <a-form-item label="路口信息">
          <a-input
            placeholder="请输入路口名称或编号"
            style="width:200px"
            v-model="crossName"
          />
        </a-form-item>
        <a-form-item label="路口状态">
          <a-select
            placeholder="请选择路口状态"
            :options="controlModelOption"
            style="width:200px"
            v-model="controlMode"
          />
        </a-form-item>
        <a-form-item label="特殊控制状态">
          <a-select
            placeholder="请选择特殊控制状态"
            :options="crossTypeOption"
            style="width:200px"
            v-model="crossType"
          />
        </a-form-item>
        <a-form-item style="float:right">
          <a-button
            type="primary"
            style="margin-right:20px"
            @click="getTableData()"
          >查询
          </a-button>
          <a-button @click="clear">清空</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="elocLog-table">
      <a-table
        bordered
        :columns="columns"
        :dataSource="tableData"
        :loading="loading"
        rowKey="crossId"
        :pagination="pagination"
      >
        <template slot="runTime" slot-scope="text,record">
          <div class="elocLog-runTime">
            <div v-for="(i,n) in record.data" :key="i.controlMode+n">
              {{`${i.startTime}~${i.endTime} ${getCrossControlMode(i.controlMode)} ${getCrossType(i.crossType)}`}}
            </div>
          </div>
        </template>
        <template slot="detail" slot-scope="text,record">
          <div class="elocLog-solt-detail">
            <img :src="plane" alt="" @click="detail(record)">
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import columns from './columns'
  import {getLogTableData} from 'api/log'
  import {getCrossControlMode,getCrossType,routeCompReplace} from 'utils/utils'
  import plane from 'img/planDetail.png'

  export default {
    name: 'log',
    data() {
      return {
        plane,
        columns: columns,
        crossName: '',
        controlMode: undefined,
        crossType: undefined,
        rangePickerValue: [this.moment(new Date()).set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        }), this.moment(new Date())],
        controlModelOption: [
          {label: '在线-固定配时', value: 'C01'},
          {label: '在线-感应控制', value: 'C02'},
          {label: '在线-特勤', value: 'C03'},
          {label: '在线-中心手动', value: 'C04'},
          {label: '在线-现场手动', value: 'C05'},
          {label: '在线-自适应', value: 'C06'},
          {label: '异常', value: 'C08'},
          {label: '脱机', value: 'C10'},
        ],
        crossTypeOption: [
          {label: '行人过街', value: '2'},
          {label: '公交优先', value: '3'},
          {label: '紧急控制', value: '7'},
          {label: '反溢控制', value: '5'},
          {label: '排队控制', value: '6'},
        ],
        tableData: [],
        loading: false,
        pagination: {
          pageSize:7,
          current: 1,
          showQuickJumper: true,
          change:(page, pageSize)=>this.getTableData({currentPageNum: page, pageRecordSize: pageSize})
        },
      }
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      moment,
      getCrossControlMode,
      getCrossType,
      getTableData(pagination = {currentPageNum: 1, pageRecordSize: 7}) {
        this.loading = true ;
        const params = {
          ...pagination,
          queryParameter: {
            controlMode: this.controlMode|| '',
            crossName: this.crossName,
            crossType: this.crossType || '',
            startDateTime: this.rangePickerValue[0].format('YYYY-MM-DD HH:mm'),
            endDateTime: this.rangePickerValue[1].format('YYYY-MM-DD HH:mm'),
          }
        };
        getLogTableData(params).then(res => {
          this.loading = false;
          this.tableData = res.msg.records
          this.pagination = {
            ...this.pagination,
            current:res.msg.currentPageNum,
            total:res.msg.totalRecordCount
          }
        })
      },
      detail(record){
        console.log(record);
        const params = {
          controlMode: this.controlMode|| '',
          crossNo:record.crossNo,
          crossType: this.crossType || '',
          crossName:record.crossName,
          formCrossName:this.crossName,
          startDateTime:this.rangePickerValue[0].format('YYYY-MM-DD HH:mm'),
          endDateTime:this.rangePickerValue[1].format('YYYY-MM-DD HH:mm')
        }
        routeCompReplace('logDetail',params)
      },
      clear(){
          this.crossName= ''
          this.controlMode= undefined
          this.crossType= undefined
      }
    },
  }
</script>
<style lang="less">
  @import 'index';
</style>
