<template>
  <div class="eloc-exitLane">
    <div class="eloc-exitLane-anchor-left" :id="'exit-anchor-left-'+number"></div>
    <div class="eloc-exitLane-anchor-center" :id="'exit-anchor-center-'+number"></div>
    <div class="eloc-exitLane-anchor-right" :id="'exit-anchor-right-'+number"></div>
    <div class="eloc-exitLane-anchor-last" :id="'exit-anchor-last-'+number"></div>
    <div class="eloc-exitLane-way-wapper">
      <div class="eloc-exitLane-way" v-for="(i,n) in rli" :key="n">
        <div class="eloc-exitLane-way-item">
        </div>
        <sidewalk  v-if="sidewalk!=='0'"/>
        <road-markings lane="exit" :number="number" :type="i.rml" v-if="i.rml&&n !== rli.length-1" />
      </div>
    </div>
    <button-box :number="number" dir="exit"/>
    <div class="eloc-exitLane-crossName" :style="crossNameStyle" v-if="crossname">
      <div class="eloc-exitLane-crossName-inner">
        <span class="eloc-exitLane-crossName-inner-text" :style="crossNameInnerStyle" v-for="(i,n) in crossname" :key="number+n">{{i}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import RoadMarkings from "../RoadMarkings";
import Sidewalk from "../Sidewalk";
import { getExitAnchor,transferLandmark} from "utils/utils";
import ButtonBox from "../ButtonBox"
export default {
  props: {
    rli: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    sidewalk: {
      type: String,
      required: true
    },
    crossname:{
      type: String,
      required: true,
    }
  },
  components: {
    RoadMarkings,
    Sidewalk,
    ButtonBox
  },
  data(){
    return {
      crossNameStyle:{},
      crossNameInnerStyle:{}
    }
  },
  mounted() {
    this.getExitAnchor(this.number);
    this.crossNameRotate();
  },
  methods: {
    getExitAnchor,
    transferLandmark,
    crossNameRotate (){
      if(this.number === 1 || this.number === 0){
        this.crossNameInnerStyle = {
          transform:"rotate(-90deg)"
        }
      }
      if(this.number === 2 || this.number === 3 || this.number === 4){
        this.crossNameStyle = {
          transform:"rotate(-180deg)"
        }
      }
      if(this.number === 4){
        this.crossNameInnerStyle = {
          transform:"rotate(-90deg)"
        }
      }
    }
  }
};
</script>  
<style lang="less">
@import "index";
</style>