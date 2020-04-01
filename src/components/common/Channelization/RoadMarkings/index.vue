<template>
  <div class="eloc-roadMarkings">
    <div class="eloc-roadMarkings-dotted" v-if="type === '0'">
      <div class="eloc-roadMarkings-dotted-item" v-for="i in dottedArr" :key="i">
        <div class="eloc-roadMarkings-dotted-item-fill"></div>
        <div class="eloc-roadMarkings-dotted-item-blank"></div>
      </div>
    </div>
    <div class="eloc-roadMarkings-solid" v-if="type === '0'"></div>
    <div class="eloc-roadMarkings-bus" v-if="type === '1'|| type === '2'">
      <div class="eloc-roadMarkings-bus-item" v-for="(i,n) in busArr" :key="i">
        <div class="eloc-roadMarkings-bus-item-fill" 
        :style="{
          backgroundColor:type === '1'?'#FFC200':'#FFF',
          width:n === busArr.length - 1?'100%':'80%'
        }"></div>
        <div class="eloc-roadMarkings-bus-item-blank" v-if="n === busArr.lebngth - 1"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 道路标线  rml 0 实线虚线 1黄虚线 2 白虚线 
    type: {
      type: String,
      required: true
    }
  },

mounted(){
},
  data() {
    return {
      dottedArr: [1, 2, 3, 4],
      busArr: [1, 2, 3, 4,5],
    };
  }
};
</script>
<style lang="less">
@import "index";
</style>