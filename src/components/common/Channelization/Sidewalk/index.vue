<template>
  <div class="eloc-sidewalk" :style="sideWalkStyle">
    <div class="eloc-sidewalk-item" v-for="(i,n) in sidewalkArray" :key="n"></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      sidewalkArray:new Array(2),
    }
  },
  props:{
    sideWalkStyle:{
      type:String
    }
  }
}
</script>
<style lang="less">
@import "index";
</style>