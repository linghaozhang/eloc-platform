<template>
  <div class="road-map">
    <div v-for="i in vipTaskInnerData" :key="i.lineId" class="road-map-wrap">
      <a-checkbox :value="i.lineId" v-if="!isPerformTask">
      </a-checkbox>
      <div class="road-map-item">
        <a-form layout="inline" class="road-map-item-form">
          <a-form-item label="路线名称">
            <a-input
              style="width:160px"
              :value="i.lineName"
              read-only
              size="small"
            />
          </a-form-item>
          <a-form-item label="路线级别">
            <a-input
              style="width:160px"
              :value="switchLineLevel(i.lineLevel)"
              size="small"
              read-only
            />
          </a-form-item>
          <a-form-item label="路线长度">
            <a-input
              style="width:160px"
              :value="i.lineLength + 'm'"
              read-only
              size="small"
            />
          </a-form-item>
          <a-form-item label="路线执行时间">
            <a-input
              size="small"
              style="width:160px"
              :value="i.startTime"
              read-only
            />
          </a-form-item>
        </a-form>
        <div class="road-map-line-container-fixed">
          <div class="road-map-line-container">
            <div
              v-for="(ii, n) in i.lineDetails"
              class="road-map-line"
              :key="ii.crossNo"
            >
              <div class="road-map-line-cross"
                   :style="isPerformTask?{backgroundColor:ii.socketState.crossBgColor}:{}"
                   @click="lineCrossClick(ii.crossNo)"
              >
                <div class="se-flag" v-if="n===0 || n===i.lineDetails.length-1">
                  <a-badge :status="n===0?'success':'error'"/>
                </div>
              </div>
              <div class="road-map-line-road"
                   :style="isPerformTask?{backgroundColor:ii.socketState.crossBgColor}:{}"
                   v-if="n!==i.lineDetails.length-1"
              >
                <span>{{ii.crossSpacing}}m</span>
              </div>
              <div class="road-map-line-switch" v-if="isPerformTask">
                <a-switch
                  v-model="switchStatus[ii.lineId+ii.crossNo]"
                  checkedChildren="停止"
                  unCheckedChildren="执行"
                  @change="(checked)=>change(checked,ii)"
                  :disabled="ii.socketState.disabled"
                />
              </div>
              <div class="road-map-label">
                {{ii.crossName}}
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
  import {vipStart, vipStop} from "api/specialService"
  import {initSocketClient, addSocketSubscribe, getCrossList} from 'api'

  export default {
    props: {
      vipTaskData: {
        type: Array,
        required: true
      },
      isPerformTask: {
        type: Boolean,
      }
    },
    watch: {
      vipTaskData: function (val) {
        this.vipTaskInnerData = val
      }
    },
    data() {
      return {
        switchStatus: {},
        vipTaskInnerData: this.vipTaskData
      }
    },
    beforeMount() {
      this.addSocketState()
      this.getCrossList()
    },
    mounted() {
      this.initSocketClient()
    },
    methods: {
      switchLineLevel,
      lineCrossClick(crossNo) {
        console.log(crossNo)
      },
      addSocketState() {
        if (!this.isPerformTask) {
          return this.vipTaskInnerData
        }
        this.vipTaskInnerData.forEach((i, n) => {
          i.lineDetails.forEach((ii, nn) => {
            ii.socketState = {
              disabled: nn === 0 ? false : true,
              crossBgColor: '#2A60FC',
              roadBgColor: '#2A60FC',
              index: n,
              innerIndex: nn
            }
            this.switchStatus[ii.lineId + ii.crossNo] = false
          })
        })
      },
      change(checked, ld) {
        const outerIndex = ld.socketState.index;
        const innerIndex = ld.socketState.innerIndex;
        let params = {lineId: ld.lineId, crossNo: ld.crossNo}
        if (checked) {
          // 执行特勤
          vipStart(params).then(res => {
            if (res.code === 0) {
              // 执行成功路口圆形变色
              this.vipTaskInnerData[outerIndex].lineDetails[innerIndex].socketState.crossBgColor = 'green';
              // 非第一个路口矩形路口变色
              if (innerIndex !== 0) {
                this.vipTaskInnerData[outerIndex].lineDetails[innerIndex - 1].socketState.roadBgColor = 'green'
                this.vipTaskInnerData[outerIndex].lineDetails[innerIndex - 1].socketState.disabled = false
              }
              // switch开启状态
              this.switchStatus[ld.lineId + ld.crossNo] = true;
            } else {
              this.switchStatus[ld.lineId + ld.crossNo] = false;
              this.$error({title: '特勤失败,请查看是否存在相位冲突'})
            }
            this.vipTaskInnerData = [...this.vipTaskInnerData]
          })
        } else {
          // 停止执行特勤
          params.type = '1'
          vipStop(params).then(res => {
            if (res.code === 0) {
              this.switchStatus[ld.lineId + ld.crossNo] = false;
            } else {
              this.switchStatus[ld.lineId + ld.crossNo] = true;
            }
          })
        }
      },
      initSocketClient() {
        if (!this.isPerformTask) {
          return false
        }
        initSocketClient().then(() => {
          addSocketSubscribe('/exchange/UTC/UTC_SLC_CONTROL', this.cb)
        })
      },
      cb(msg) {
        if (msg.body) {
          const body = JSON.parse(msg.body)
          console.log('body', body)
          this.vipTaskInnerData.forEach(i => {
            i.lineDetails.forEach(ii => {
              if (ii.crossNo === body.crossNo) {
                ii.socketState.controlMode = body.controlType
              }
            })
          })
          this.updateCrossList()
        }
      },
      addControlMode(msg) {
        msg.forEach(i => {
          this.vipTaskInnerData.forEach(ii => {
            ii.lineDetails.forEach(iii => {
              if (iii.crossNo === i.crossNo) {
                // 找到对应路口 添加路口对应controlMode字段
                iii.socketState.controlMode = i.controlMode
              }
            })
          })
        })
      },
      getCrossList() {
        if (!this.isPerformTask) {
          return false
        }
        getCrossList().then(res => {
          if (res.code === 0) {
            this.addControlMode(res.msg)
          }
        }).then(() => {
          this.updateCrossList()
        })
      },
      updateCrossList() {
        if (!this.isPerformTask) {
          return false
        }
        let cache = [...this.vipTaskInnerData]
        let outerIndex, innerIndex;
        let pre, next;
        this.vipTaskInnerData.forEach((i) => {
          i.lineDetails.forEach((ii) => {
            let controlMode = ii.socketState.controlMode;
            outerIndex = ii.socketState.index;
            innerIndex = ii.socketState.innerIndex;
            pre = cache[outerIndex].lineDetails[innerIndex - 1]
            next = cache[outerIndex].lineDetails[innerIndex + 1]
            if (controlMode === 'C03') {
              ii.socketState.crossBgColor = 'green';
              // 找到当前遍历项前一项
              if (pre && pre.socketState.controlMode === 'CO3') {
                // 前面路口变色
                pre.socketState.roadBgColor = 'green'
              }
              // 下一个路口 解除switch禁用
              if (next) {
                next.socketState.disabled = false
              }
              // 更改当前switch为选中状态
              this.switchStatus[ii.lineId + ii.crossNo] = true;
            } else if (controlMode === 'C07' || controlMode === 'C08' || controlMode === 'C09' || controlMode === 'C10') {
              ii.socketState.crossBgColor = 'red';
              this.switchStatus[ii.lineId + ii.crossNo] = false;
              if (pre &&
                (
                  pre.socketState.controlMode === 'CO7' ||
                  pre.socketState.controlMode === 'CO8' ||
                  pre.socketState.controlMode === 'CO9' ||
                  pre.socketState.controlMode === 'C10'
                )
              ) {
                pre.socketState.roadBgColor = 'red'
              }
            }
          })
        })
        this.vipTaskInnerData = [...cache]
      }
    },
  }
</script>
<style lang="less">
  @import 'index';
</style>