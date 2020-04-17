<template>
  <div class="eloc-roadMarkings">
    <div class="eloc-roadMarkings-dotted" v-if="type === '0'">
      <div class="eloc-roadMarkings-dotted-item" v-for="i in dottedArr" :key="i">
        <div class="eloc-roadMarkings-dotted-item-fill"></div>
        <div class="eloc-roadMarkings-dotted-item-blank"></div>
      </div>
    </div>
    <div class="eloc-roadMarkings-solid" v-if="type === '0'"></div>
    <!-- 公交车道线 -->
    <div class="eloc-roadMarkings-bus" v-if="type === '1'|| type === '2'">
      <div class="eloc-roadMarkings-bus-item" v-for="(i,n) in busArr" :key="i">
        <div
          class="eloc-roadMarkings-bus-item-fill"
          :style="{
          backgroundColor:type === '1'?'#FFC200':'#FFF',
          width:n === busArr.length - 1?'100%':'80%'
        }"
        ></div>
        <div class="eloc-roadMarkings-bus-item-blank" v-if="n === busArr.lebngth - 1"></div>
      </div>
    </div>
    <!-- 公交车道线 end-->
    <!-- 非机动车道 -->
    <div :class="nmvlCls" v-if="type==='3'||type==='4'||type==='5'">
      <div class="eloc-roadMarkings-single-grandBar-container" v-if="type === '4'">
        <div class="eloc-roadMarkings-single-grandBar-container-item" v-for="(i,n) in new Array(5)" :key="n"></div>
      </div>
      <div class="eloc-roadMarkings-nmvl-text" :style="{marginTop:lane === 'import' ? '3px' :'-19px'}">
        <span :style="transformCommonRotate(number)">非</span>
        <span :style="transformCommonRotate(number)">机</span>
        <span :style="transformCommonRotate(number)">动</span>
        <span :style="transformCommonRotate(number)">车</span>
        <span :style="transformCommonRotate(number)">道</span>
      </div>
    </div>
    <!-- 非机动车道 end-->
  </div>
</template>
<script>
import { transformCommonRotate } from "utils/utils";
export default {
  props: {
    // 道路标线  rml 0 实线虚线 1黄虚线 2 白虚线
    type: {
      type: String,
      required: true
    },
    // 路口方向
    number: {
      type: Number,
      required: false
    },
    lane:{
      type: String,
      required: true
    }
  },
  methods: {
    transformCommonRotate,
  },
  beforeUpdate(){
    this.nmvlCls = {
        'eloc-roadMarkings-single-fill': this.type === '3',
        'eloc-roadMarkings-single-grandBar': this.type === '4',
        'eloc-roadMarkings-single-greenBelt' :this.type === '5'
      }
  },
  data() {
    return {
      dottedArr: [1, 2, 3, 4],
      busArr: [1, 2, 3, 4, 5],
      nmvlCls:{
        'eloc-roadMarkings-single-fill': this.type === '3',
        'eloc-roadMarkings-single-grandBar': this.type === '4',
        'eloc-roadMarkings-single-greenBelt' :this.type === '5'
      }
    };
  }
};
</script>
<style lang="less">
@import "index";
</style>