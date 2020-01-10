<template>
  <div class="taskDetail">
    <div class="taskDetail-form">
      <a-form layout="inline">
        <a-form-item label="任务名称">
          <a-input
            placeholder="请输入任务级别"
            style="width:200px"
            v-model="vipName"
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
        <a-form-item label="添加方式">
          <a-select
            placeholder="请选择添加路线方式"
            :options="vipAddOption"
            style="width:200px"
            @select="vipAddChange"
          />
        </a-form-item>
        <a-form-item style="float:right">
          <a-button
            type="primary"
            style="margin-right:20px"
          >编辑
          </a-button>
          <a-button>删除</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="taskDetail-list">
      <div class="taskDetail-list-title">
        任务路线列表
        <div class="taskDetail-list-title-btn">
          <a-button type="primary" style="margin-right:20px;" @click="onSave">保存</a-button>
          <a-button @click="onCancel">返回</a-button>
        </div>
      </div>
      <div class="taskDetail-list-warp">
        <a-checkbox-group v-if="vipTaskData.length>0" v-model="lineCheck" @change="onLineChange">
          <road-map
            :vipTaskData="vipTaskData"
          />
        </a-checkbox-group>
        <a-empty v-else style="margin-top:200px;"/>
      </div>
    </div>
    <a-modal
      v-model="selectVisible"
      title="选择已有线路"
      :footer="null"
      width="70%"
    >
      <div class="eloc-select-line">
        <div class="eloc-select-line-form">
          <a-form layout="inline">
            <a-form-item label="路线名称">
              <a-input
                placeholder="请输入路线名称"
                v-model="selectLineName"
              />
            </a-form-item>
            <a-form-item label="任务起止时间">
              <a-range-picker
                :showTime="{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
                      }"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="selectRangePickerValue"
              />
            </a-form-item>
            <a-form-item style="float:right">
              <a-button
                type="primary"
                style="margin-right:20px"
                @click="searchLine"
              >查询
              </a-button>
              <a-button @click="selectSave">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="eloc-select-line-list">
          <a-spin :spinning="selectLineLoading">
            <a-checkbox-group v-if="selectTaskData.length" v-model="selectLineCheck">
              <road-map
                :vipTaskData="selectTaskData"
                :isPerformTask="false"
              />
            </a-checkbox-group>
            <a-empty v-else style="margin-top:100px;"/>
          </a-spin>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import moment from 'moment'
  import RoadMap from 'components/specialService/RoadMap'
  import {getRouteCompParams, routeCompReplace} from 'utils/utils'
  import {getVipTaskById, getVipLineList,updateVipTask,saveVipTask} from 'api/specialService'

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
        console.log(getRouteCompParams())
        this.vipId = getRouteCompParams().ids;
        if (this.vipId && this.vipId.length > 0) {
          this.vipName = getRouteCompParams().vipName
          getVipTaskById({vipId: this.vipId[0]}).then(res => {
            this.vipTaskData = res.msg.vipLine
            this.setValueBack()
          })
        }
      },
      onSave() {
        if(this.vipTaskData.length === 0){
          return this.$error({title:'任务路线为空'})
        }
        if(this.vipName === ''){
          return this.$error({title:'请输入任务名称'})
        }
        let params = {
          vipName:this.vipName,
          vipLevel:this.vipLevel,
          vipStartTime:moment(this.rangePickerValue[0]).format('YYYY-MM-DD HH:mm:ss'),
          vipEndTime:moment(this.rangePickerValue[1]).format('YYYY-MM-DD HH:mm:ss'),
          vipLine:this.vipTaskData
        }
        if(this.vipId && this.vipId.length){
          // 编辑
          params.vipId = this.vipId[0]
          updateVipTask(params).then(res=>{
            console.log('编辑',res)
            if(res.code === 0){
              this.$success({title:'更新成功'})
            }
          })
        }else{
          // 新增
          saveVipTask(params).then(res=>{
            console.log('保存',res)
            if(res.code === 0){
              this.$success({title:'保存成功'})
            }
          })
        }
      },
      vipAddChange(v) {
        if (v === '2') this.openSelectVipLine()
      },
      openSelectVipLine() {
        this.selectVisible = true;
        this.searchLine()
      },
      searchLine() {
        this.selectLineLoading = true
        const params = {
          lineName: this.selectLineName,
          beginTime: this.selectRangePickerValue[0] ? this.selectRangePickerValue[0].format('YYYY-MM-DD HH:mm:ss') : '',
          endTime: this.selectRangePickerValue[1] ? this.selectRangePickerValue[1].format('YYYY-MM-DD HH:mm:ss') : '',
        }
        getVipLineList(params).then(res => {
          this.selectTaskData = res.msg
          this.selectLineLoading = false
        })
      },
      selectSave() {
        let arr = []
        console.log(this.vipTaskData)
        this.selectLineCheck.forEach((i => {
          this.selectTaskData.forEach(ii => {
            if (i === ii.lineId) {
              arr.push(ii)
            }
          })
        }));
        this.vipTaskData = [...this.vipTaskData.concat(arr)]
        console.log(this.vipTaskData)
        this.selectVisible = false;
        this.setValueBack()
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
    },

  }
</script>
<style lang="less">
  @import 'index';
</style>