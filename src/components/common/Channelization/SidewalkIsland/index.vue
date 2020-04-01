<template>
  <div class="eloc-sidewalkIsland">
    <div class="island" v-if="sidewalkType === '2'">

    </div>
  </div>
</template>
<script>
export default {
  props:{
    sidewalkType:{
      type:String,
      required:true
    },
  }
}
</script>
<style lang="less">
@import 'index';
</style>