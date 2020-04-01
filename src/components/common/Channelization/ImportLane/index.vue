<template>
  <div class="eloc-importLane">
    <div class="eloc-importLane-anchor-left" :id="'import-anchor-left-'+number"></div>
    <div class="eloc-importLane-anchor-center" :id="'import-anchor-center-'+number"></div>
    <div class="eloc-importLane-anchor-right" :id="'import-anchor-right-'+number"></div>
    <div class="eloc-importLane-anchor-last" :id="'import-anchor-last-'+number"></div>
    <div class="eloc-importLane-way-wrapper">
      <div class="eloc-importLane-way" v-for="(i,n) in rri" :key="n">
        <div class="eloc-importLane-way-item">123</div>
        <sidewalk sideWalkStyle="right:-55px"/>
        <road-markings :type="i.rml" v-if="i.rml" />
      </div>
    </div>
    <button-box :number="number" dir="import"/>
  </div>
</template>
<script>
import RoadMarkings from "../RoadMarkings";
import Sidewalk from "../Sidewalk";
import ButtonBox from "../ButtonBox"
import { getImportAnchor } from "utils/utils";
export default {
  name: "eloc-importLane",
  components: {
    RoadMarkings,
    Sidewalk,
    ButtonBox
  },
  props: {
    rri: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.getImportAnchor(this.number)
  },
  methods: {
    getImportAnchor,
  },
};
</script>  
<style lang="less">
@import "index";
</style>