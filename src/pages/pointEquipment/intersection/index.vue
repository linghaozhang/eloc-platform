<template>
  <div class="intersection">
    <div class="baseInfoConfig">
      <div class="baseInfoConfig-form">
        <div class="baseInfoConfig-form-title">设备基础信息配置</div>
        <div class="baseInfoConfig-form-equipment">
          <a-form layout="inline" :form="form">
            <a-form-item label="设备名称">
              <a-select
                v-decorator="['equipName', { rules: [{ required: false}] }]"
                showSearch
                placeholder="请选择设备"
                :options="equipOption"
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="设备编号">
              <a-input
                v-decorator="['equipId', { rules: [{ required: false}] }]"
                placeholder="设备编号"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="点位名称">
              <a-input
                v-decorator="['crossName', { rules: [{ required: true}] }]"
                placeholder="请输入点位名称"
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="路口编号">
              <a-input
                v-decorator="['crossId', { rules: [{ required: true}] }]"
                placeholder="请输入路口编号"
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="行政区域">
              <a-input
                v-decorator="['division', { rules: [{ required: false}] }]"
                placeholder="行政区域"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="组织单位">
              <a-input
                v-decorator="['company', { rules: [{ required: false}] }]"
                placeholder="组织单位"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="路口坐标">
              <a-input
                v-decorator="['crossPoint', { rules: [{ required: true}] }]"
                placeholder="路口坐标"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="路口备注">
              <a-input
                v-decorator="['remark', { rules: [{ required: true}] }]"
                placeholder="请输入路口备注"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="信号机品牌">
              <a-input
                v-decorator="['slcCompany', { rules: [{ required: true}] }]"
                placeholder="请输信号机品牌"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="协议类型">
              <a-select
                v-decorator="['slcKind', { rules: [{ required: false}] }]"
                :options="slcKindOption"
                style="width: 200px"
                placeholder="请选择协议类型"
              ></a-select>
            </a-form-item>
            <a-form-item label="机柜类型">
              <a-select
                v-decorator="['intelligentBox', { rules: [{ required: false}] }]"
                :options="intelligentBoxOption"
                style="width: 200px"
                placeholder="请选择机柜类型"
              ></a-select>
            </a-form-item>
            <a-form-item label="CCU">
              <a-select
                v-decorator="['ccuName', { rules: [{ required: false}] }]"
                :options="ccuNameOption"
                style="width: 200px"
                placeholder="请选择CCU"
              ></a-select>
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="ip地址">
              <a-input
                v-decorator="['slcIp', { rules: [{ required: true}] }]"
                placeholder="ip地址"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="端口">
              <a-input
                v-decorator="['slcPort', { rules: [{ required: true}] }]"
                placeholder="端口"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="baseInfoConfig-map-direction">地图</div>
    </div>
    <div class="baseCanals"></div>
  </div>
</template>
<script>
import { queryEquipmentByType, getEquipIdList,CCUQuery } from "api/pointEquipment";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "baseEqui" }),
      equipOption: [],
      equipIdList: [],
      slcKindOption:[
        {label:'MTC1032',value:'1'},
        {label:'国标20999',value:'2'},
        {label:'MTC2000',value:'3'}
      ],
      intelligentBoxOption:[
        {label:'普通机柜',value:'2'},
        {label:'智能机柜',value:'1'},
      ],
      ccuNameOption:[]
    };
  },
  mounted() {
    this.getEquipOption();
    this.getCCUName();
  },
  methods: {
    getEquipOption() {
      const params = { equipType: "11" };
      getEquipIdList()
        .then(res => {
          if (res.result) {
            this.equipIdList = res.msg;
          }
        })
        .then(() => {
          queryEquipmentByType(params).then(res => {
            this.equipOption = res.msg.map(i => ({
              label: i.equipmentName,
              value: i.equipmentId,
              class:
                this.equipIdList.indexOf(i.equipmentId) === -1
                  ? ""
                  : "intersectionMark"
            }));
          });
        });
    },
    getCCUName(){
      CCUQuery().then(res=>{
        this.ccuNameOption = res.msg.map(i=>({
          label:i.ccuCount? `${i.ccuName}(${i.ccuCount})`:i.ccuName,
          value:i.ccuName
        }))
      })
    }
  }
};
</script>  
<style lang="less">
@import "index";
</style>