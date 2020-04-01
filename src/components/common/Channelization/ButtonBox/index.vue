<template>
  <div class="eloc-btn-box">
    <el-button
      :style="transformRotate(number)"
      type="primary"
      icon="el-icon-plus"
      @click="onAdd"
      circle
    ></el-button>
    <el-button
      :style="{marginLeft:'0',...transformRotate(number)}"
      icon="el-icon-minus"
      @click="onReudce"
      circle
    ></el-button>
  </div>
</template>
<script>
import { transformRotate, getImportAnchor, getExitAnchor } from "utils/utils";
import { rriItem, rliItem } from "utils/constant";
export default {
  props: {
    number: {
      type: Number,
      required: true
    },
    dir: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    transformRotate,
    getExitAnchor,
    getImportAnchor,
    onAdd() {
        console.log(this.number)
      let channelData = [...this.$store.state.channelization.channelData];
      channelData[0].road.forEach(i => {
        if (i.number === this.number) {
          if (this.dir === "import") {
            if (i.rri.length === 8) {
              return false;
            }
            i.rri.push({...rriItem});
          } else {
            if (i.rli.length === 8) {
              return false;
            }
            i.rli.unshift({...rliItem});
            if(i.rli.length>1){
              i.rli[1].rml = "2";
            }
          }
        }
      });
      this.repaintSVG();
      this.$store.dispatch("channelization/setChannelData",{channelData:[...channelData]})
    },
    onReudce() {
      let channelData = [...this.$store.state.channelization.channelData];
      console.log(this.number)
      channelData[0].road.forEach(i => {
        if (i.number === this.number) {
          if (this.dir === "import") {
            if (i.rri.length === 0) {
              return false;
            }
            i.rri.splice(i.rri.length - 1, 1);
          } else {
            if (i.rli.length === 0) {
              return false;
            }
            i.rli.splice(0,1);
          }
        }
      });
      this.repaintSVG();
      this.$store.dispatch("channelization/setChannelData",{channelData:[...channelData]})
    },
    repaintSVG() {
      this.$nextTick(() => {
        let channelData = [...this.$store.state.channelization.channelData];
        this.$store.dispatch("channelization/setRoadPosition", {
          roadPosition: []
        });
        channelData[0].road.forEach(i => {
          this.getExitAnchor(i.number);
          this.getImportAnchor(i.number);
        });
      });
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>