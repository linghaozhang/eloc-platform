<template>
  <div class="eloc-importLane">
    <div class="eloc-importLane-anchor-left" :id="'import-anchor-left-'+number"></div>
    <div class="eloc-importLane-anchor-center" :id="'import-anchor-center-'+number"></div>
    <div class="eloc-importLane-anchor-right" :id="'import-anchor-right-'+number"></div>
    <div class="eloc-importLane-anchor-last" :id="'import-anchor-last-'+number"></div>
    <div class="eloc-importLane-way-wrapper">
      <div class="eloc-importLane-way" v-for="(i,n) in rri" :key="n">
        <div class="eloc-importLane-way-item">
          <div class="eloc-importLane-way-item-landmark" @click="(e)=>landmarkClick(e,n,i.fx)">
            <img :src="transferLandmark(i.fx)" alt />
          </div>
        </div>
        <sidewalk sideWalkStyle="right:-55px" />
        <waiting-areas :type="waType(i.fx)" v-if="waHidden(i.fx)" />
        <road-markings :type="i.rml" v-if="i.rml" />
      </div>
    </div>
    <button-box :number="number" dir="import" />
  </div>
</template>
<script>
import RoadMarkings from "../RoadMarkings";
import Sidewalk from "../Sidewalk";
import ButtonBox from "../ButtonBox";
import WaitingAreas from "../WaitingAreas";
import { landmarkData } from "utils/constant";
import { getImportAnchor, transferLandmark, initBusOptions } from "utils/utils";
export default {
  name: "eloc-importLane",
  components: {
    RoadMarkings,
    Sidewalk,
    ButtonBox,
    WaitingAreas
  },
  props: {
    rri: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    was: {
      type: String,
      required: true
    },
    wal: {
      type: String,
      required: true
    }
  },
  computed: {
    waHidden() {
      return function(fx) {
        if (fx === "11" && this.was === "1") {
          return true;
        } else if (fx === "12" && this.wal === "1") {
          return true;
        } else {
          return false;
        }
      };
    },
    waType() {
      return function(fx) {
        if (fx === "11") {
          return "1";
        } else if (fx === "12") {
          return "0";
        }
      };
    }
  },
  data() {
    return {
      isHidden: true,
      landmarkData: [...landmarkData]
    };
  },
  mounted() {
    console.log("mounted");
    this.getImportAnchor(this.number);
  },
  methods: {
    getImportAnchor,
    transferLandmark,
    initBusOptions,
    landmarkClick(e, index, fx) {
      e.stopPropagation();
      this.setSelector(e,index,fx);
      this.$store.dispatch("channelization/setFormRoadDir", {
        formRoadDir: this.number
      });
      this.initBusOptions();
      this.getCurrentRoad();
    },
    setSelector(e,index,fx) {
      let position = e.target.getBoundingClientRect();
      const road = this.$store.state.channelization.channelData[0].road;
      this.$store.dispatch("channelization/changeSelectorVisible", {
        selectorVisible: true
      });
      this.$store.dispatch("channelization/setSelectorType", {
        selectorType: "eloc-CM-selector-landmark"
      });
      this.$store.dispatch("channelization/setSelectorOptions", {
        selectorOptions: [...this.landmarkData]
      });
      this.$store.dispatch("channelization/setSelectorStyle", {
        selectorStyle: {
          top: `${position.top}px`,
          left: `${position.left + position.width}px`
        }
      });
      this.$store.dispatch("channelization/setDataPosition", {
        selectorDataPosition: { number: this.number, index, value: fx }
      });
      const laneNum = road.filter(i => this.number === i.number)[0].rri[index]
        .serialNum;
      this.$store.dispatch("channelization/setLaneNum", {
        formLaneNum: laneNum
      });
    },
    getCurrentRoad() {
      const road = this.$store.state.channelization.channelData[0].road;
      let curRoad = road.filter(i => i.number === this.number)[0];
      this.$store.dispatch("channelization/setCurrentRoadData", {
        currentRoadData: { ...curRoad }
      });
      console.log(curRoad)
    }
  }
};
</script>  
<style lang="less">
@import "index";
</style>