<template>
  <div class="eloc-btn-box">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="onAdd"
      circle
    ></el-button>
    <el-button
      :style="{marginLeft:'0'}"
      icon="el-icon-minus"
      @click="onReudce"
      circle
    ></el-button>
  </div>
</template>
<script>
import { transformRotate, getImportAnchor, getExitAnchor,addImportLaneNum } from "utils/utils";
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
    addImportLaneNum,
    onAdd() {
      let channelData = [...this.$store.state.channelization.channelData];
      channelData[0].road.forEach(i => {
        if (i.number === this.number) {
          if (this.dir === "import") {
            if (i.rri.length === 8) {
              return false;
            }
            if(i.rri.length>3){
              i.rri.splice(i.rri.length-2,0,{...rriItem});
            }else{
              i.rri.splice(0,0,{...rriItem});
            }
          } else {
            if (i.rli.length === 8) {
              return false;
            }
            if(i.rli.length>3){
              i.rli.splice(2,0,{...rliItem});
            }else{
              i.rli.push({...rliItem})
            }
            // if(i.rli.length>1){
            //   i.rli[1].rml = "2";
            // }
          }
        }
      });
      // 重画svg
      this.repaintSVG();
      this.$store.dispatch("channelization/setChannelData",{channelData:[...channelData]})
      // 重新计算车道序号和带方向的车道序号
      this.addImportLaneNum()
    },
    onReudce() {
      let channelData = [...this.$store.state.channelization.channelData];
      channelData[0].road.forEach(i => {
        if (i.number === this.number) {
          if (this.dir === "import") {
            if (i.rri.length === 0) {
              return false;
            }
            i.rri.splice(i.rri.length - 3, 1);
          } else {
            if (i.rli.length === 0) {
              return false;
            }
            i.rli.splice(2,1);
          }
        }
      });
      // 重画svg
      this.repaintSVG();
      this.$store.dispatch("channelization/setChannelData",{channelData:[...channelData]});
       // 重新计算车道序号和带方向的车道序号
      this.addImportLaneNum()
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