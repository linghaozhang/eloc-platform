<template>
  <div class="performTask">
    <div class="performTask-form">
      <a-form layout="inline">
        <a-form-item label="任务名称">
          <a-input
            placeholder="请输入任务级别"
            style="width:200px"
            v-model="vipName"
            read-only
          />
        </a-form-item>
        <a-form-item label="任务级别">
          <a-select
            placeholder="请选择任务级别"
            :options="vipLevelOption"
            style="width:200px"
            v-model="vipLevel"
            disabled
          />
        </a-form-item>
        <a-form-item label="任务起止时间">
          <a-range-picker
            :showTime="{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
                      }"
            format="YYYY-MM-DD HH:mm:ss"
            disabled
            v-model="rangePickerValue"
          />
        </a-form-item>
        <a-form-item style="float:right">
          <a-button @click="onCancel">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="performTask-list">
      <div class="performTask-list-title">
        任务路线列表
      </div>
      <div class="performTask-list-warp">
        <a-checkbox-group v-if="vipTaskData.length>0" v-model="lineCheck" @change="onLineChange">
          <road-map
            :vipTaskData="vipTaskData"
            :isPerformTask="true"
          />
        </a-checkbox-group>
        <a-empty v-else style="margin-top:200px;"/>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import RoadMap from 'components/specialService/RoadMap'
  import {getRouteCompParams, routeCompReplace} from 'utils/utils'
  import {getVipTaskById} from 'api/specialService'

  export default {
    data() {
      return {
        vipLevel: undefined,
        rangePickerValue: [],
        vipName: '',
        vipLevelOption: [
          {label: '一级', value: '1'},
          {label: '二级', value: '2'},
          {label: '三级', value: '3'},
        ],
        vipAddOption: [
          {label: '创建新线路', value: '1'},
          {label: '选择已有线路', value: '2'},
        ],
        lineCheck: [],
        vipTaskData: [],
        vipId: [],
        selectVisible: false,
        selectRangePickerValue: [],
        selectLineName: '',
        selectTaskData: [],
        selectLineCheck: [],
        selectLineLoading: false
      }
    },

    components: {
      RoadMap
    },
    mounted() {
      this.getLineDetailById()
    },
    methods: {
      moment,
      onLineChange(v) {
        console.log(v)
      },
      onCancel() {
        routeCompReplace('specialService')
      },
      getLineDetailById() {
        this.vipId = getRouteCompParams().vipId;
        if (this.vipId && this.vipId.length > 0) {
          this.vipName = getRouteCompParams().vipName
          getVipTaskById({vipId: this.vipId}).then(res => {
            this.vipTaskData = res.msg.vipLine
            this.setValueBack()
          })
        }
      },
      setValueBack(){
        let level = 0,startTime='',endTime='';
        this.vipTaskData.forEach(i=>{
          if(Number(i.lineLevel) > level){
            level = i.lineLevel
          }
          if(startTime === ''){
            startTime = i.startTime
          }else if(moment(startTime).valueOf() > moment(i.startTime).valueOf()){
            startTime = i.startTime
          }
          if(endTime === ''){
            endTime = i.endTime
          }else if(moment(endTime).valueOf() < moment(i.endTime).valueOf()){
            endTime = i.endTime
          }
        })
        this.vipLevel = level
        this.rangePickerValue=[moment(startTime),moment(endTime)]
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>