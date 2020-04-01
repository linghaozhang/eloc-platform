<template>
  <div class="eloc-exitLane">
    <div class="eloc-exitLane-anchor-left" :id="'exit-anchor-left-'+number"></div>
    <div class="eloc-exitLane-anchor-center" :id="'exit-anchor-center-'+number"></div>
    <div class="eloc-exitLane-anchor-right" :id="'exit-anchor-right-'+number"></div>
    <div class="eloc-exitLane-anchor-last" :id="'exit-anchor-last-'+number"></div>
    
    <div class="eloc-exitLane-way-wapper">
      <div class="eloc-exitLane-way" v-for="(i,n) in rli" :key="n">
        <div class="eloc-exitLane-way-item"></div>
        <sidewalk  />
        <road-markings :type="i.rml" v-if="i.rml&&n !== 0" />
      </div>
    </div>
    <button-box :number="number" dir="exit"/>
  </div>
</template>
<script>
import RoadMarkings from "../RoadMarkings";
import Sidewalk from "../Sidewalk";
import { getExitAnchor} from "utils/utils";
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
    }
  },
  components: {
    RoadMarkings,
    Sidewalk,
    ButtonBox
  },
  mounted() {
    this.getExitAnchor(this.number)
  },
  methods: {
    getExitAnchor,
  }
};
</script>  
<style lang="less">
@import "index";
</style>