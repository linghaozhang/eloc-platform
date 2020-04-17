<template>
  <div class="eloc-CM-selector-wrapper">
    <div :class="`eloc-CM-selector ${selectorType}`" :style="selectorStyle" v-if="selectorVisible">
      <div
        class="eloc-CM-selector-option"
        v-for="(i,n) in selectorOptions"
        :key="n"
        @click="(e)=>optionsClick(e,i)"
      >
        <div
          :style="{...optionLandmarkStyle(i)}"
          class="eloc-CM-selector-option-landmark"
          v-if="i.type ==='landmark'"
        >
          <img :src="i.label" :style="transformRotate(selectorDataPosition.number)" />
        </div>
        <div
          class="eloc-CM-selector-option-bus"
          v-if="i.type==='landmarkBus'"
          :style="{...selectorOptionBusStyle}"
        >{{i.label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { eleAppendToBody, transformRotate } from "utils/utils";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "selectorStyle",
      "selectorOptions",
      "selectorVisible",
      "selectorType",
      "selectorDataPosition",
      "selectorOptionBusStyle",
      "selectorOptionBusActive"
    ]),
    optionLandmarkStyle() {
      return function(i) {
        return {
          backgroundColor:
            this.selectorDataPosition.value === i.value ? "#2A60FC" : ""
        };
      };
    }
  },
  mounted() {
    this.eleAppendToBody(this.$el);
    this.addBodyEvent();
  },
  methods: {
    eleAppendToBody,
    transformRotate,
    addBodyEvent() {
      const body = document.querySelector("body");
      body.addEventListener("click", () => {
        this.$store.dispatch("channelization/changeSelectorVisible", {
          selectorVisible: false
        });
      });
    },
    landmarkOptionsShunt(item) {
      // 路标点击事件分流
      this.$store.dispatch("channelization/setDataPosition", {
        selectorDataPosition: {
          ...this.selectorDataPosition,
          value: item.value
        }
      });
      // 设置路标
      let channelData = this.$store.state.channelization.channelData;
      channelData[0].road.forEach(i => {
        if (i.number === this.selectorDataPosition.number) {
          i.rri[this.selectorDataPosition.index].fx = item.value;
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
    },
    landmarkBusOptionsShunt() {
      // 路标中公交专用点击分流
      const channelData = this.$store.state.channelization.channelData;
      const { number, index } = this.selectorDataPosition;
      // todo 判断 this.selectorOptionBusActive，改变公交专用样式，和this.selectorOptionBusActive状态
      if(this.selectorOptionBusActive){
        this.$store.dispatch('channelization/setSelectorOptionBusStyle',{selectorOptionBusStyle:{}});
        this.$store.dispatch('channelization/setSelectorOptionBusActive',{selectorOptionBusActive:false});
      }else{
        this.$store.dispatch("channelization/setSelectorOptionBusStyle", {selectorOptionBusStyle: { backgroundColor: "#2A60FC",color:'#fff' }});
        this.$store.dispatch("channelization/setSelectorOptionBusActive",{selectorOptionBusActive:true})
      }
      channelData[0].road.forEach(i => {
        if (i.number === number) {
          if (index === 0) {
            // 判断是不是第一条车道
            i.rri[0].rml = this.selectorOptionBusActive ? "1" : "0";
          } else if(index === i.rri.length-1){
            // 判断是不是最后一条车道
            i.rri[index-1].rml = this.selectorOptionBusActive ? "1" : "0";
          }else{
            this.selectorOptionBusActive?i.rri[index - 1].rml = "1" : i.rri[index - 1].rml = '0'
            this.selectorOptionBusActive?i.rri[index].rml = "1" : i.rri[index].rml = '0'
          }
        }
      });
      this.$store.dispatch("channelization/setChannelData", {
        channelData: [...channelData]
      });
    },
    optionsClick(e, item) {
      e.stopPropagation();
      if (item.type === "landmark") {
        this.landmarkOptionsShunt(item);
      }
      if (item.type === "landmarkBus") {
        this.landmarkBusOptionsShunt();
      }
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>