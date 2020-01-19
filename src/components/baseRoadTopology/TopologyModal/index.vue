<template>
  <div class="brt-modal">
    <a-form layout="inline" class="brt-modal-form" :form="form">
      <a-form-item label="起始路口">
        <eloc-select
          placeholder="请选择起始路口"
          v-model="startInfo"
          :disabled="isEdit"
          @nodeChange="(node)=>nodeChange(node,'beginCrossExit','beginCrossExitOption')"
        />
      </a-form-item>
      <a-form-item label="起始路口出口">
        <a-select
          v-decorator="['beginCrossExit', { rules: [{ required: true, message: '请选择起始路口出口' }] }]"
          placeholder="请选择起始路口出口"
          :options="beginCrossExitOption"
          :disabled="isEdit"
          style="width:200px"
        />
      </a-form-item>
    </a-form>
    <a-form layout="inline" class="brt-modal-form" :form="form">
      <a-form-item label="终止路口">
        <eloc-select
          placeholder="请选择终止路口"
          v-model="endInfo"
          :disabled="isEdit"
          @nodeChange="(node)=>nodeChange(node,'endCrossEntry','endCrossEntryOption')"
        />
      </a-form-item>
      <a-form-item label="终止路口入口">
        <a-select
          v-decorator="['endCrossEntry', { rules: [{ required: true, message: '请选择终止路口入口' }] }]"
          placeholder="请选择终止路口入口"
          :options="endCrossEntryOption"
          :disabled="isEdit"
          style="width:200px"
        />
      </a-form-item>
    </a-form>
    <a-form layout="inline" class="brt-modal-form" :form="form">
      <a-form-item label="路段车道数">
        <a-input
          v-decorator="['roadCount', { rules: [{ required: true, message: '请输入路段车道数' },{validator: validateRoadCount}] }]"
          style="width:280px"
          placeholder="请输入路段车道数"
        />
      </a-form-item>
      <a-form-item label="路段长度">
        <a-input
          v-decorator="['roadLen', { rules: [{ required: true, message: '请输入路段长度' },{validator: validateFloat}] }]"
          style="width:200px"
          placeholder="请输入路段长度"
          addonAfter="m"
        />
      </a-form-item>
    </a-form>
    <a-form layout="inline" class="brt-modal-form" :form="form">
      <a-form-item label="路段等级">
        <a-select
          v-decorator="['roadSectionLevel', { rules: [{ required: true, message: '请选择路段等级' }] }]"
          placeholder="请选择路段等级"
          :options="roadSectionLevelOption"
          style="width:280px"
        />
      </a-form-item>
    </a-form>
    <a-form layout="inline" class="brt-modal-form">
      <a-form-item label="生成反向路段">
        <a-switch v-model="reverse" @change="switchChange" />
      </a-form-item>
    </a-form>
    <!-- 反向路段 -->
    <div calss="brt-reverse-container" v-if="reverse">
      <a-form layout="inline" class="brt-modal-form" :form="form">
        <a-form-item label="起始路口">
          <eloc-select :disabled="true" placeholder="请选择起始路口" v-model="reStartInfo" />
        </a-form-item>
        <a-form-item label="起始路口出口">
          <a-select
            v-decorator="['reBeginCrossExit', { rules: [{ required: true, message: '请选择起始路口出口' }] }]"
            placeholder="请选择起始路口出口"
            :options="reBeginCrossExitOption"
            :disabled="isEdit"
            style="width:200px"
          />
        </a-form-item>
      </a-form>
      <a-form layout="inline" class="brt-modal-form" :form="form">
        <a-form-item label="终止路口">
          <eloc-select v-model="reEndInfo" :disabled="true" placeholder="请选择终止路口" />
        </a-form-item>
        <a-form-item label="终止路口入口">
          <a-select
            :disabled="isEdit"
            v-decorator="['reEndCrossEntry', { rules: [{ required: true, message: '请选择终止路口入口' }] }]"
            placeholder="请选择终止路口入口"
            :options="reEndCrossEntryOption"
            style="width:200px"
          />
        </a-form-item>
      </a-form>
      <a-form layout="inline" class="brt-modal-form" :form="form">
        <a-form-item label="路段车道数">
          <a-input
            v-decorator="['reRoadCount', { rules: [{ required: true, message: '请输入路段车道数' },{validator: validateRoadCount}] }]"
            style="width:280px"
            placeholder="请输入路段车道数"
          />
        </a-form-item>
        <a-form-item label="路段长度">
          <a-input
            v-decorator="['reRoadLen', { rules: [{ required: true, message: '请输入路段长度' },{validator: validateFloat}] }]"
            style="width:200px"
            placeholder="请输入路段长度"
            addonAfter="m"
          />
        </a-form-item>
      </a-form>
      <a-form layout="inline" class="brt-modal-form" :form="form">
        <a-form-item label="路段等级">
          <a-select
            v-decorator="['reRoadSectionLevel', { rules: [{ required: true, message: '请选择路段等级' }] }]"
            placeholder="请选择路段等级"
            :options="roadSectionLevelOption"
            style="width:280px"
          />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import ElocSelect from "components/common/ElocSelect";
import { getCrossBranchDir , getRoadTopologyInfoByNo ,getCrossNoById} from "api/roadTopology";
import { switchCrossExit, validateRoadCount, validateFloat } from "utils/utils";
export default {
  data() {
    const options = [
      { label: "北", value: "0" },
      { label: "东", value: "2" },
      { label: "南", value: "4" },
      { label: "西", value: "6" },
      { label: "东北", value: "1" },
      { label: "东南", value: "3" },
      { label: "西南", value: "5" },
      { label: "西北", value: "7" }
    ];
    return {
      form: this.$form.createForm(this, { name: "brt-modal" }),
      beginCrossExitOption: [...options], //起始路口出口候选项
      reBeginCrossExitOption: [...options], //反向路段起始路口出口候选项
      endCrossEntryOption: [...options], //结束路口入口候选项
      reEndCrossEntryOption: [...options], //反向路段结束路口入口候选项
      roadSectionLevelOption: [
        //路段等级候选项
        { label: "快速路", value: "0001" },
        { label: "主干路", value: "0002" },
        { label: "次路", value: "0003" },
        { label: "支路", value: "0004" }
      ],
      startInfo: "", //起始路口
      endInfo: "", //结束路口
      reStartInfo: "", //反向路段起始路口
      reEndInfo: "", //反向路段结束路口
      reverse: false //生成反向路段
    };
  },
  props:{
    isEdit:Boolean,
    roadSectionNo:String
  },
  components: {
    ElocSelect
  },
  mounted(){
    this.feedBack()
  },
  methods: {
    validateRoadCount,
    validateFloat,
    feedBack(){
      if(!this.isEdit || !this.roadSectionNo) return false
      this.feedBackBrt()
    },
    feedBackBrt(){
      getRoadTopologyInfoByNo({roadSectionNo:this.roadSectionNo}).then(res=>{
        const {msg} = res;
        if(msg.beginCrossId){
        this.nodeChange(msg.beginCrossId,'beginCrossExit','beginCrossExitOption')
        .then(()=>this.reBeginCrossExitOption = [...this.endCrossEntryOption])
        }
        if(msg.endCrossId){
        this.nodeChange(msg.endCrossId,'endCrossEntry','endCrossEntryOption')
        .then(()=>this.reEndCrossEntryOption = [...this.beginCrossExitOption])
        }
        this.startInfo = msg.beginCrossId && msg.beginCrossName?`${msg.beginCrossId}-${msg.beginCrossName}`:'';
        this.endInfo = msg.endCrossId && msg.endCrossName?`${msg.endCrossId}-${msg.endCrossName}`:''
        this.reEndInfo = msg.beginCrossId && msg.beginCrossName ? `${msg.beginCrossId}-${msg.beginCrossName}`: '';
        this.reStartInfo =  msg.endCrossId && msg.endCrossName?`${msg.endCrossId}-${msg.endCrossName}` :''
        this.form.setFieldsValue({
          beginCrossExit:msg.beginCrossExit.substr(4,1),
          endCrossEntry:msg.endCrossEntry.substr(4,1),
          roadCount:msg.roadSectionLaneNum,
          roadLen:msg.roadSectionLength,
          roadSectionLevel:msg.roadSectionLevel
        })
        return msg
      }).then(msg => this.feedBackReBrt(msg))
    },
    feedBackReBrt(msg){
      if(msg.hasReverse ==='1') {
        this.reverse = true;
        const beginCrossNo = msg.beginCrossNo === 'IIII' ? 'OOOO' : msg.beginCrossNo;
        const endCrossNo = msg.endCrossNo === 'OOOO' ? 'IIII' : msg.endCrossNo;
        const reverseRoadNo = endCrossNo + msg.endCrossEntry.substr(4,1) + "2" +beginCrossNo +msg.beginCrossExit.substr(4,1) + "1";
        getRoadTopologyInfoByNo({roadSectionNo:reverseRoadNo}).then(res=>{
          this.form.setFieldsValue({
            reRoadCount:res.msg.roadSectionLaneNum,
            reRoadLen:res.msg.roadSectionLength,
            reRoadSectionLevel:res.msg.roadSectionLevel,
            reBeginCrossExit:res.msg.beginCrossExit.substr(4,1),
            reEndCrossEntry:res.msg.endCrossEntry.substr(4,1)
          })
        })
      }
    },
    nodeChange(node, select, options) {
      if (!node) return false;
      this.form.setFieldsValue({ [select]: undefined });
      const crossId = node.substr(0, 4);
      return getCrossBranchDir({ crossId }).then(res => {
        this[options] = res.msg.map(i => ({
          label: switchCrossExit(i),
          value: i
        }));
      });
    },
    switchChange(checked) {
      if (!checked) return false;
      this.reStartInfo = this.endInfo;
      this.reEndInfo = this.startInfo;
      this.reBeginCrossExitOption = [...this.endCrossEntryOption];
      this.reEndCrossEntryOption = [...this.beginCrossExitOption];
      const values = this.form.getFieldsValue([
        "beginCrossExit",
        "endCrossEntry",
        "roadCount",
        "roadLen",
        "roadSectionLevel"
      ]);
      console.log(values);
      this.$nextTick(() =>
        this.form.setFieldsValue({
          reRoadCount: values.roadCount,
          reRoadLen: values.roadLen,
          reBeginCrossExit: values.endCrossEntry,
          reEndCrossEntry: values.beginCrossExit,
          reRoadSectionLevel: values.roadSectionLevel
        })
      );
    },
    getAllFields() {
      let value = "";
      // 表单验证
      this.form.validateFields((err, val) => {
        if (err) return false;
        value = val;
      });
      // 表单验证失败则退出
      if (!value) return false;
      // 验证起始路口与终止路口
      if(this.startInfo === this.endInfo){
        this.$error({title:'起始路口与终止路口不能相同！'})
        return false 
      }
      // 验证起始出口与终止入口
      if(value.beginCrossExit === value.endCrossEntry){
        this.$error({title:'起始路口出口与终止路口入口不能相同！'})
        return false 
      }
      // 验证反向起始路口与终止路口
      if(this.reStartInfo === this.reEndInfo){
        this.$error({title:'起始路口与终止路口不能相同！'})
        return false 
      }
      // 验证反向起始出口与终止入口
      if(this.reverse && value.reBeginCrossExit === value.reEndCrossEntry){
        this.$error({title:'起始路口出口与终止路口入口不能相同！'})
        return false
      }
      // 正向数据集合
      let forwardInfo = {};
      // 反向数据集合
      let reverseInfo = {};
      // 异步请求列表
      let asyncList = [];
      if (!this.startInfo) {
        forwardInfo.beginCrossNo = "IIII";
      } else {
        asyncList.push(
          getCrossNoById({ crossId: this.startInfo.substr(0, 4) })
        );
      }
      if (!this.endInfo) {
        forwardInfo.endCrossNo = "OOOO";
      } else {
        asyncList.push(getCrossNoById({ crossId: this.endInfo.substr(0, 4) }));
      }
      return Promise.all(asyncList)
        .then(res => {
          if (res.length === 2) {
            forwardInfo.beginCrossNo = res[0].msg.crossNo;
            forwardInfo.endCrossNo = res[1].msg.crossNo;
          } else if (res.length === 1 && forwardInfo.beginCrossNo === "IIII") {
            forwardInfo.endCrossNo = res[0].msg.crossNo;
          } else if (res.length === 1 && forwardInfo.endCrossNo === "OOOO") {
            forwardInfo.beginCrossNo = res[0].msg.crossNo;
          }
        })
        .then(() => {
          const { beginCrossNo, endCrossNo } = forwardInfo;
          forwardInfo.roadSectionNo =
            beginCrossNo +
            value.beginCrossExit +
            "2" +
            endCrossNo +
            value.endCrossEntry +
            "1";
          forwardInfo.beginCrossExit =
            beginCrossNo + value.beginCrossExit + "2";
          forwardInfo.endCrossEntry = endCrossNo + value.endCrossEntry + "1";
          forwardInfo.roadSectionLevel = value.roadSectionLevel;
          forwardInfo.roadSectionLength = value.roadLen;
          forwardInfo.roadSectionLaneNum = value.roadCount;
          if (this.reverse) {
            reverseInfo.beginCrossNo = endCrossNo;
            reverseInfo.endCrossNo = beginCrossNo;
            reverseInfo.roadSectionNo =
              endCrossNo +
              value.reBeginCrossExit +
              "2" +
              beginCrossNo +
              value.reEndCrossEntry +
              "1";
            reverseInfo.beginCrossExit =
              endCrossNo + value.reBeginCrossExit + "2";
            reverseInfo.endCrossEntry =
              beginCrossNo + value.reEndCrossEntry + "1";
            reverseInfo.roadSectionLevel = value.reRoadSectionLevel;
            reverseInfo.roadSectionLength = value.reRoadLen;
            reverseInfo.roadSectionLaneNum = value.reRoadCount;
            reverseInfo.hasReverse = 1;
            forwardInfo.hasReverse = 1;
          }
          return [ forwardInfo, reverseInfo ];
        });
    }
  }
};
</script>  
<style lang="less">
@import "index";
</style>