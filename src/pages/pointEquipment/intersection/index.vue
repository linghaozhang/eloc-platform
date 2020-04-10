<template>
  <div class="intersection">
    <div class="baseInfoConfig">
      <div class="baseInfoConfig-form">
        <div class="baseInfoConfig-form-title">设备基础信息配置</div>
        <div class="baseInfoConfig-form-equipment">
          <a-form layout="inline" :form="form">
            <a-form-item label="设备名称">
              <a-select
                v-decorator="['equipName', { rules: [{ required: true,message:'请选择设备'}] }]"
                showSearch
                placeholder="请选择设备"
                :options="equipOption"
                style="width: 200px"
                @change="equipNameChange"
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
                v-decorator="['crossName', { rules: [{ required: true,message:'请输入点位名称'}] }]"
                placeholder="请输入点位名称"
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="路口编号">
              <a-input
                v-decorator="['crossId', { rules: [{ required: true,message:'请输入路口编号'}] }]"
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
                v-decorator="['company', { rules: [{ required: false}] ,initialValue:''}]"
                placeholder="组织单位"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="路口坐标">
              <a-input
                v-decorator="['crossPoint', { rules: [{ required: true,message:'请输入路口坐标'}] }]"
                placeholder="路口坐标"
                read-only
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="路口备注">
              <a-input
                v-decorator="['remark', { rules: [{ required: false}] ,initialValue:''}]"
                placeholder="请输入路口备注"
                style="width: 200px"
              />
            </a-form-item>
            <a-form-item label="信号机品牌">
              <a-input
                v-decorator="['slcCompany', { rules: [{ required: true,message:'请输信号机品牌'}] }]"
                placeholder="请输信号机品牌"
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="协议类型">
              <a-select
                v-decorator="['slcKind', { rules: [{ required: false}],initialValue:'1'}]"
                :options="slcKindOption"
                style="width: 200px"
                placeholder="请选择协议类型"
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
            <a-form-item label="ip地址">
              <a-input
                v-decorator="['slcIp', { rules: [{ required: true,message:'请输入IP地址'}] }]"
                placeholder="ip地址"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
          <a-form layout="inline" :form="form">
            <a-form-item label="端口">
              <a-input
                v-decorator="['slcPort', { rules: [{ required: false}],initialValue:'4000' }]"
                placeholder="端口"
                read-only
                style="width: 200px"
              />
            </a-form-item>
          </a-form>
        </div>
        <div class="baseInfoConfig-form-title">设备安全配置</div>
        <div class="baseInfoConfig-form-equipment">
          <a-form layout="inline" :form="form">
            <a-form-item label="机柜类型">
              <a-select
                v-decorator="['intelligentBox', { rules: [{ required: false}] ,initialValue:'2'}]"
                :options="intelligentBoxOption"
                style="width: 200px"
                placeholder="请选择机柜类型"
              ></a-select>
            </a-form-item>
          </a-form>
        </div>
        <div class="baseInfoConfig-form-title">路口图片设置</div>
        <div class="baseInfoConfig-form-upload">
          <a-upload
            :action="uploadUrl"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传路口图片</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </div>
      <div class="baseInfoConfig-map-direction">
        <div class="baseInfoConfig-map-container">
          <eloc-map mapId="intersection" @getMapContext="getMapContext" ref="intersectionMap" />
        </div>
        <div class="baseInfoConfig-direction">
          <div class="baseInfoConfig-direction-title">路口形状选择</div>
          <cross-direction @getDirectoinData="getDirectionData" ref="crossDirection"></cross-direction>
          <a-button class="baseInfoConfig-direction-confirm-btn" type="primary" @click="confirmIntersection">路口形状确认</a-button>
        </div>
      </div>
    </div>
    <div class="baseCanals" v-if="showBaseCanals">
      <div class="baseCanals-channelWrapper">
        <channelization-map />
      </div>
      <div class="baseCanals-channelForm">
        <channelization-form />
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryEquipmentByType,
  getEquipIdList,
  CCUQuery,
  queryEquipmentById,
  queryDepartmentByDeptId,
  checkCross,
  deleteCrossInfo,
  saveCrossInfo,
  getDefaultChannelData
} from "api/pointEquipment";
import { ElocMap,ChannelizationMap,ChannelizationForm } from "components/common";
import { baseUrl } from "utils/constant";
import { getDirNumber,getDftRoadMsg,sortChannelData } from "utils/utils";
import CrossDirection from "components/pointEquipment/CrossDirection";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "baseEqui" }),
      uploadUrl: baseUrl + "upload_one",
      mapContext: null,
      equipOption: [],
      equipIdList: [],
      slcKindOption: [
        { label: "MTC1032", value: "1" },
        { label: "国标20999", value: "2" },
        { label: "MTC2000", value: "3" }
      ],
      intelligentBoxOption: [
        { label: "普通机柜", value: "2" },
        { label: "智能机柜", value: "1" }
      ],
      ccuNameOption: [],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      pointOne: null,
      saveParams:{
        crossNo:0,
        organization:'',
        area:'',
        countDownMode:1
      },
      dirData:[],
      channelData:[],
      showBaseCanals:false
    };
  },
  components: {
    ElocMap,
    CrossDirection,
    ChannelizationMap,
    ChannelizationForm
  },
  mounted() {
    this.getEquipOption();
    this.getCCUName();
    this.initMap();
    getDefaultChannelData().then(data=>this.channelData = data.msg)
  },
  methods: {
    getMapContext(mapContext) {
      this.mapContext = mapContext;
    },
    initMap() {
      this.$refs.intersectionMap.initElocMap();
    },
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
    getCCUName() {
      const { setFieldsValue } = this.form;
      CCUQuery().then(res => {
        this.ccuNameOption = res.msg.map(i => ({
          label: i.ccuCount ? `${i.ccuName}(${i.ccuCount})` : i.ccuName,
          value: i.ccuName
        }));
        setFieldsValue({ ccuName: this.ccuNameOption[0].value });
      });
    },
    equipNameChange(v) {
      const { setFieldsValue } = this.form;
      queryEquipmentById({ equipId: v })
        .then(res => {
          if (res.result) {
            setFieldsValue({
              equipId: res.msg.equipmentId,
              division: res.msg.districtName,
              crossPoint:
              res.msg.longitude && res.msg.latitude ? res.msg.longitude + "," + res.msg.latitude : "",
              slcIp: res.msg.ip,
              crossName: res.msg.roadName
            });
            this.saveParams.area = res.msg.district;
            this.saveParams.slcId = res.msg.equipmentId;
            if (this.pointOne) {
              window.gis.OverlayUtil.removeOverlay(this.pointOne);
            }
            this.pointOne = window.gis.OverlayUtil.createMarker(
              res.msg.longitude,
              res.msg.latitude,
              null,
              {}
            ).addTo(this.mapContext.map);
            this.mapContext.panTo(res.msg.longitude, res.msg.latitude);
            if (res.msg.manageDept) {
              this.saveParams.organization = res.msg.manageDept;
              return res.msg.manageDept;
            }
          }
        })
        .then(manageDept => {
          queryDepartmentByDeptId(manageDept).then(res => {
            if (res.result && res.msg.jgmc) {
              setFieldsValue({ company: res.msg.jgmc });
            }
          });
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    getDirectionData(data){
      this.dirData = data
    },
    calChannelData(){
      /**
       * 计算渠化数据方法
       * dirData 路口方向选择数据
       * channelData 默认渠化数据
       */
      this.dirData.forEach(i=>{
        if(i.selected){
          let filterResult = this.channelData[0].road.filter(j=>j.number === getDirNumber(i.dir)) 
          if(filterResult.length === 0){
            this.channelData[0].road.push(getDftRoadMsg(i.dir))
          }
        }else{
          let index = -1;
          this.channelData[0].road.forEach((j,n)=>{
            if(j.number === getDirNumber(i.dir)){ index = n }
          });
          if(index !== -1){
            this.channelData[0].road.splice(index,1)
          }
        }
      })
      this.channelData[0].road.sort(sortChannelData)
      console.log('channel',this.channelData[0].road)
      this.showBaseCanals = true
      this.$nextTick(()=>{
        document.getElementsByClassName('intersection')[0].scrollTo(0,10000)
      })
      this.$store.dispatch('channelization/setChannelData',{channelData:this.channelData})
      console.log('setChannelData',this.$store.state.channelization.channelData)
    },
    checkSaveCross(val){ 
      /**
       * 校验基础配置信息并保存方法
       */
      const params = {crossId:val.crossId,equipId:val.equipId}
      checkCross(params)
      .then(res=>{
        if(res.msg === '1'){ return this.$error({title:'此路口编号已被使用'})}
        if(res.msg === '2'){ return this.$error({title:'此设备已被使用'})}
        if(res.msg === '3'){ return this.$error({title:'路口编号和设备均被使用'})}
      })
      .then(()=>{
        const saveParams = {
          ...val,
          ...this.saveParams,
          pointx:val.crossPoint.split(',')[0],
          pointy:val.crossPoint.split(',')[1],
          }
        delete saveParams.crossPoint
        delete saveParams.division
        saveCrossInfo(saveParams).then(res=>{
          this.crossNo = res.msg;
        })
      })
      .then(()=>{
        this.calChannelData()
      })
    },
    confirmIntersection(){
      /**
       * 确认路口形状点击事件
       */
      this.showBaseCanals = false
      this.$refs.crossDirection.getDirectoinData();
      if(this.dirData.filter(i=>i.selected).length < 2){
        return this.$error({title:'请正确选择路口形状'})
      }
      const {form: { validateFields } } = this;
      validateFields((err,val)=>{
        if(err){ return false}
        if(this.crossNo){
          this.checkSaveCross(val)
          deleteCrossInfo({crossNo:this.crossNo}).then(()=>{
            this.checkSaveCross(val)
          })
        }else{
          this.checkSaveCross(val)
        }
      })
    },
  }
};
</script>  
<style lang="less">
@import "index";
</style>