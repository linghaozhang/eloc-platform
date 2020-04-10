<template>
  <div class="eloc-roadTape">
    <sidewalk-island :sidewalkType="sidewalk" :median="median"/>
    <exit-lane :rli="rli" :number="number" />
    <import-lane :rri="rri" :number="number" :wal="wal" :was="was"/>
    <div :class="roadTape"></div>
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
  },
  components: {
    ImportLane,
    ExitLane,
    SidewalkIsland
  },
  data() {
    return {
      roadTape: {
        singleYellowLine: this.median === "0" ? true : false,
        doubleYellowLine: this.median === "3" ? true : false,
        greenBelt: this.median === "1" ? true : false,
        medianStrip: this.median === "2" ? true : false
      }
    };
  }
};
</script>  
<style lang="less">
@import "index";
</style>