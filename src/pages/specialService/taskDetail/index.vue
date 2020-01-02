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
        <a-form-item label="添加方式">
          <a-select
                  placeholder="请选择添加路线方式"
                  :options="vipAddOption"
                  style="width:200px"
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
      <div class="taskDetail-list-title">任务路线列表</div>
      <div class="taskDetail-list-warp">
        <a-checkbox-group v-model="lineCheck" @change="onLineChange">
          <road-map />
        </a-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import RoadMap from 'components/specialService/RoadMap'

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
        lineCheck: []
      }
    },
    components: {
      RoadMap
    },
    methods: {
      moment,
      onLineChange(v) {
        console.log(v)
      },
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>