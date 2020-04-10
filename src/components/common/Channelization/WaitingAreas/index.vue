<template>
  <div :class="waitingAreaClass">
    <div class="eloc-waiting-area-topline">
      <div
        class="eloc-waiting-area-topline-item"
        v-for="(i,n) in topLineData"
        :key="n"
        :style="{...i}"
      ></div>
    </div>
    <div :class="stopLineStyle">
      <div class="eloc-waiting-area-stopline-left-close" v-if="type==='0'"></div>
    </div>
    <div :class="innerStyle">
      <img :src="type==='0'?left:straight" alt />
    </div>
    <div class="eloc-waiting-area-bottomline">
      <div
        class="eloc-waiting-area-bottomline-item"
        v-for="(i,n) in bottomLineData"
        :key="n"
        :style="{...i}"
      ></div>
    </div>
  </div>
</template>
<script>
import { left, straight } from "utils/constant";
export default {
  props: {
    // type : 0 左转待转 1 直行待行
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    initWA() {
      const baseData = new Array(5);
      const topTurnleftData = [
        { transform: "rotate(-6deg)", top: "0" },
        { transform: "rotate(-13deg)", top: "-5px" },
        { transform: "rotate(-18deg)", top: "-12px" },
        { transform: "rotate(-24deg)", top: "-22px" },
        { transform: "rotate(-29deg)", top: "-34px" }
      ];
      const bottomTurnleftData = [
        { transform: "rotate(-7deg)", bottom: 0 },
        { transform: "rotate(-13deg)", bottom: "5px" },
        { transform: "rotate(-18deg)", bottom: "11px" },
        { transform: "rotate(-24deg)", bottom: "20px" },
        { transform: "rotate(-27deg)", bottom: "31px" }
      ];
      this.topLineData = this.type === "1" ? baseData : topTurnleftData;
      this.bottomLineData = this.type === "1" ? baseData : bottomTurnleftData;
      this.stopLineStyle = {
        "eloc-waiting-area-stopline-left": this.type === "0",
        "eloc-waiting-area-stopline-straight": this.type === "1"
      };
      this.innerStyle = {
        "eloc-waiting-area-inner": true,
        "eloc-waiting-area-left-inner": this.type === "0"
      };
      this.waitingAreaClass = {
        "eloc-waiting-area": true,
        "eloc-waiting-area-l": this.type === "1"
      };
    }
  },
  mounted() {
    this.initWA();
  },
  beforeUpdate() {
    this.initWA();
  },
  data() {
    return {
      left,
      straight,
      topLineData: [],
      bottomLineData: [],
      stopLineStyle: {},
      innerStyle: {},
      waitingAreaClass: {}
    };
  }
};
</script>  
<style lang="less">
@import "index";
</style>