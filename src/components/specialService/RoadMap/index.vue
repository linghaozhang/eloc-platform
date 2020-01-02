<template>
  <div class="road-map">
    <div v-for="i in vipTaskData" :key="i.lineId">
      <a-checkbox :value="i.lineId">
      </a-checkbox>
      <div class="road-map-item">
        <a-form layout="inline" class="road-map-item-form">
          <a-form-item label="路线名称">
            <a-input
                    style="width:160px"
                    :value="i.lineName"
                    readonly
                    size="small"
            />
          </a-form-item>
          <a-form-item label="路线级别">
            <a-input
                    style="width:160px"
                    :value="switchLineLevel(i.lineLevel)"
                    size="small"
                    readonly
            />
          </a-form-item>
          <a-form-item label="路线长度">
            <a-input
                    style="width:160px"
                    :value="i.lineLength + 'm'"
                    readonly
                    size="small"
            />
          </a-form-item>
          <a-form-item label="路线执行时间">
            <a-input
                    size="small"
                    style="width:160px"
                    :value="i.startTime"
                    readonly
            />
          </a-form-item>
        </a-form>
        <div class="road-map-line-container-fixed">
          <div class="road-map-line-container">
            <div
              v-for="(item, n) in i.lineDetails"
              class="road-map-line"
              :key="item.crossNo"
            >
              <div class="road-map-line-cross" @click="lineCrossClick(item.crossNo)">
                <div class="se-flag" v-if="n===0 || n===i.lineDetails.length-1">
                  <a-badge :status="n===0?'success':'error'"/>
                </div>
              </div>
              <div class="road-map-line-road" v-if="n!==i.lineDetails.length-1">
                <span>{{item.crossSpacing}}m</span>
              </div>
              <div class="road-map-label">
                {{item.crossName}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {switchLineLevel} from 'utils/utils'
  export default {
    props: {
      vipTaskData: {
        type: Array,
        required: true
      }
    },
    methods: {
      switchLineLevel,
      lineCrossClick(crossNo) {
        console.log(crossNo)
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>