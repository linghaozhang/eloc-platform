<template>
  <div class="eloc-topbar">
    <div class="menu-fold-btn" @click="toggleCollapsed">
      <a-icon class="menu-fold" :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </div>
    <div class="eloc-topbar-left">
      <div v-for="i in data" class="eloc-topbar-left-content" :key="i">
        <a-tooltip>
          <template slot="title">
            prompt text
          </template>
          <img src="./../../../assets/images/ehl-wangluo.png" alt="">
          <div class="eloc-topbar-left-state">
            <div>
              <span style="color:#22ac38">126</span>/553
            </div>
            <div style="font-size:12px">
              联网状态联网
            </div>
          </div>
        </a-tooltip>
      </div>
    </div>
    <div class="eloc-topbar-right">
      <div class="eloc-topbar-right-scroll">
        <div class="eloc-topbar-right-scroll-text">
          将于2019年4月20日9点18分从新华南路路口沿新华大街开始执行特勤任务
        </div>
      </div>
      <div class="avatar-badge">
        <div class="avatar-badge-content">
          <a-badge showZero :count="counts" @click="showWarningTip">
            <a-icon class="eloc-badge" type="bell" style="font-size:24px;color:#2A60FC;cursor: pointer"/>
          </a-badge>
        </div>
      </div>
    </div>
    <a-modal
            v-model="warnTipVisible"
            title="告警消息"
            :footer="null"
            width="80%"
            @cancel="clearInput"
    >
      <a-spin :spinning="warnTipLoading">
        <div class="warnTip">
          <div class="warnTip-form">
            <a-form layout="inline" :form="form">
              <a-form-item>
                <a-select
                        placeholder="请选择告警类型"
                        :options="warnTipTypeOption"
                        class="warnTip-form-item"
                        v-model="warningKind"
                >
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-input
                        placeholder="请输入路口编号或路口名称"
                        class="warnTip-form-item"
                        v-model="crossId"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-select
                        placeholder="请选择告警级别"
                        :options="warnTipLevelOption"
                        class="warnTip-form-item"
                        v-model="warningLevel"
                >
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                        placeholder="请选择告警明细"
                        :options="warnTipDetailOption"
                        class="warnTip-form-item"
                        v-model="warningId"
                >
                </a-select>
              </a-form-item>
              <a-form-item style="float:right">
                <a-button style="margin-right:15px" @click="warnTipSearch">
                  查询
                </a-button>
                <a-button style="margin-right:15px" type="primary" @click="warnTipSave">
                  保存
                </a-button>
                <a-button type="primary" @click="clearInput">
                  清空
                </a-button>
              </a-form-item>
            </a-form>
          </div>
          <div class="warnTip-table">
            <a-table
                    :columns="columns"
                    :dataSource="tableData"
                    bordered
                    rowKey="crossNo"
                    :pagination="pagination"
            >
              <template slot="shieldStartTime" slot-scope="text, record, index">
                <a-range-picker
                        :defaultValue="record | rangePickerDefault"
                        :showTime="{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                      }"
                        format="YYYY-MM-DD HH:mm:ss"
                        @ok="(date)=>onOkDatePicker(date, text, record, index)"
                />
              </template>
              <template slot="remark" slot-scope="text, record, index">
                <a-textarea
                        v-model="tableData[index].remark"
                        placeholder="请输入备注"
                        :rows="2"
                        :defaultValue="record.remark"/>
              </template>
            </a-table>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {initSocketClient, addSocketSubscribe} from 'api'
  import {getWarningCounts, getWarningLogs, warnTipSave} from 'api/topBar'
  import columns from './columns'
  import moment from 'moment'

  export default {
    data() {
      return {
        data: [1, 2, 3, 4, 5, 6, 7],
        counts: '',
        warnTipVisible: false,
        form: this.$form.createForm(),
        columns: columns,
        warnTipTypeOption: [
          {label: '信号机', value: '1'},
          {label: '信号灯', value: '2'},
          {label: '检测器', value: '3'},
          {label: '服务器', value: '5'},
        ],
        warnTipLevelOption: [
          {label: '一级', value: '1'},
          {label: '二级', value: '2'},
          {label: '三级', value: '3'},
        ],
        warnTipDetailOption: [
          {label: 'MMU检测板故障', value: 'W101'},
          {label: 'BOU板故障', value: 'W102'},
          {label: '灯箱输出板故障', value: 'W103'},
          {label: '电源故障', value: 'W104'},
          {label: '网络故障', value: 'W108'},
          {label: '红灯故障', value: 'W201'},
          {label: '红绿同亮', value: 'W202'},
          {label: '绿冲突', value: 'W203'},
          {label: '检测器异常', value: 'W301'},
          {label: '服务器异常', value: 'W501'},
        ],
        warningKind: undefined,
        crossId: '',
        warningLevel: undefined,
        warningId: undefined,
        tableData: [],
        warnTipLoading: false,
//        分页配置
        pagination: {
          pageSize: 6,
          showQuickJumper: true,
          size:'small'
        }
      }
    },
    computed: {
      ...mapGetters(['collapsed'])
    },
    filters: {
      rangePickerDefault(record) {
        if (record.shieldStartTime && record.shieldEndTime) {
          return [moment(record.shieldStartTime), moment(record.shieldEndTime)]
        } else {
          return []
        }
      }
    },
    mounted() {
      this.getWarningCounts();
      initSocketClient().then(() => addSocketSubscribe('/exchange/UTC/UTC_SLC_FAULT', this.rabbitMqCallBack))
    },
    methods: {
      moment,
      toggleCollapsed() {
        this.$store.dispatch('appMain/toggleCollapsed')
      },
      rabbitMqCallBack(res) {
        if (res.body) this.getWarningCounts()
      },
      clearInput() {
        this.warningKind = undefined;
        this.warningLevel = undefined;
        this.warningId = undefined;
        this.crossId = ''
      },
      getWarningCounts() {
        getWarningCounts().then(res => {
          this.counts = res.msg.counts
        })
      },
      showWarningTip() {
        this.warnTipVisible = true;
        this.warnTipLoading = true;
        this.getWarningLogs().then(() => {
          this.warnTipLoading = false
        })
      },
      getWarningLogs(params = {}) {
        return getWarningLogs(params).then(res => {
          this.tableData = res.msg;
        });
      },
      warnTipSearch() {
        const params = {
          warningKind: this.warningKind || '',
          crossId: this.crossId || '',
          warningLevel: this.warningLevel || '',
          warningId: this.warningId || ''
        };
        this.warnTipLoading = true;
        this.getWarningLogs(params).then(() => {
          this.warnTipLoading = false
        })
      },
      warnTipSave() {
        this.warnTipLoading = true;
        warnTipSave(this.tableData).then(res => {
          if (res.code === 0) {
            this.$success({title: '保存成功'})
          }
          this.warnTipLoading = false
        })
      },
      onOkDatePicker(date, text, record, index) {
        console.log(date, text, record, index);
        const tableData = [...this.tableData];
        tableData[index].shieldStartTime = date[0].format('YYYY-MM-DD HH:mm:ss');
        tableData[index].shieldEndTime = date[1].format('YYYY-MM-DD HH:mm:ss');
        this.tableData = [...tableData]
      },

    }
  }
</script>
<style lang="less">
  @import 'index';
</style>