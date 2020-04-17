<template>
  <div class="eloc-roadTape">
    <exit-lane :rli="rli" :number="number"  :sidewalk="sidewalk" :crossname="crossname"/>
    <import-lane :rri="rri" :number="number" :wal="wal" :was="was" :sidewalk="sidewalk" />
    <div :class="roadTape">
      <!-- 二次行人岛 -->
      <div class="sideWalk-island-wapper">
        <sidewalk-island v-if="sidewalk === '2'" :median="median" />
      </div>
      <!-- 二次行人岛 end-->
      <!-- 提前调头 -->
      <div :class="earlyTurnCls" v-if="earlyTurn === '1'">
        <div :class="etBottomBorder">
          <div class="et-bottomborder-item"  v-for="(i,n) in new Array(3)" :key="n"></div>
        </div>
      </div>
      <!-- 提前调头 end-->
      <!-- 护栏子项 -->
      <div class="grandBar-item-warpper" v-if="median === '2'">
        <div class="grandBar-item" v-for="(i,n) in new Array(5)" :key="n"></div>
      </div>
      <!-- 护栏子项 end-->
    </div>
  </div>
</template>
<script>
import ImportLane from "../ImportLane";
import ExitLane from "../ExitLane";
import SidewalkIsland from "../SidewalkIsland";

export default {
  props: {
    rri: {
      type: Array,
      required: true
    },
    rli: {
      type: Array,
      required: true
    },
    median: {
      type: String,
      required: true
    },
    sidewalk: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    was:{
      type: String,
      required: true
    },
    wal:{
      type: String,
      required: true
    },
    earlyTurn:{
      type: String,
      required: true
    },
    crossname:{
      type: String,
      required: true
    }
  },
  components: {
    ImportLane,
    ExitLane,
    SidewalkIsland
  },
  beforeUpdate(){
    this.calcToadTape();
    this.calcEarlyTurnCls()
  },
  methods:{
    calcToadTape(){
      this.roadTape = {
        commonTape:true,
        singleYellowLine: this.median === "0",
        doubleYellowLine: this.median === "1",
        grandBar:this.median === "2",
        greenBelt: this.median === "3",
        medianStrip: this.median === "4",
      }
    },
    calcEarlyTurnCls(){
      this.earlyTurnCls={
        commonEarlyTurnClass:true,
        // 绿化带 黄斜线 高度绑定heightETcls 的class
        heightETcls:this.median === "3" || this.median === "4",
        // 双黄线 高度绑定middleHeightETcls 的class
        middleHeightETcls:this.median === '1'||this.median === '2',
        //单黄线 高度绑定 singleHeightETcls 的class
        singleHeightETcls:this.median === '0'
      }
      this.etBottomBorder={
        'et-bottomborder':true,
        'et-double-bottomBorder':this.median === '1'||this.median === '2',
        'et-single-bottomBorder':this.median === '0'
      }
    }
  },

  data() {
    return {
      // median：道路中心线类型（0：单黄线，1：双黄线，2：护栏，3：绿化带，4：黄斜线，）
      roadTape: {
        commonTape:true,
        singleYellowLine: this.median === "0",
        doubleYellowLine: this.median === "1",
        grandBar:this.median === "2",
        greenBelt: this.median === "3",
        medianStrip: this.median === "4",
      },
      grandBarData:[],
      earlyTurnCls:{
        commonEarlyTurnClass:true,
        // 绿化带 黄斜线 高度绑定heightETcls 的class
        heightETcls:this.earlyTurn === '1'  && (this.median === "3" || this.median === "4"),
        // 双黄线 高度绑定middleHeightETcls 的class
        middleHeightETcls:this.earlyTurn === '1' && (this.median === '1'||this.median === '2'),
        //单黄线 高度绑定 singleHeightETcls 的class
        singleHeightETcls:this.earlyTurn  === '1' && this.median === '0'
      },
      // 待转区中的虚线
      etBottomBorder:{
        'et-bottomborder':this.earlyTurn === '1' ,
        'et-double-bottomBorder':this.earlyTurn === '1'  && (this.median === '1'||this.median === '2'),
        'et-single-bottomBorder':this.earlyTurn === '1'  && this.median === '0'
      }
    };
  }
};
</script>  
<style lang="less">
@import "index";
</style>