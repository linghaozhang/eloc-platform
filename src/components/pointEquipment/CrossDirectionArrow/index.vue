<template>
  <div :class="selected?'direction-arrow selected':'direction-arrow unselected'" :style="calcStyle" @click="onArrowClick">
    <div class="arrow-container">
      <div class="arrow-container-white">
        <div class="arrow-container-text">
          {{dir}}
        </div>
      </div>
    </div>
    <div class="direction-arrow-sector">
      <div class="direction-arrow-sector-container">
        <img :src="selected?sector:unselectSector" alt="">
      </div>
      <div class="direction-arrow-sector-rect"></div>
    </div>
  </div>
</template>
<script>
import sector from 'img/sector.png'
import unselectSector from 'img/unselect-sector.png'
export default {
  data(){
    return {
      sector,
      unselectSector,
      calcStyle:{}
    }
  },
  beforeMount(){
    this.calcPostion()
  },
  props:{
    selected:Boolean,
    dir:String
  },
  methods:{ 
    calcPostion(){
      const dir = this.dir;
      const baseStyle={
          position:'absolute',
          // bottom:this.selected ? '60px' : '90px',
          bottom:'60px',
          left:'8.79px',
          // transformOrigin:this.selected ?'50% 113.555556%':'50% 130.107692%'
          transformOrigin:'50% 113.135556%'
      }
      if(dir === 'N'){
        this.calcStyle = {...baseStyle}
      }else if(dir === 'NE'){
        this.calcStyle = {...baseStyle,transform: 'rotate(45deg)'}
      }else if(dir === 'E'){
        this.calcStyle = {...baseStyle,transform: 'rotate(90deg)'}
      }else if(dir === 'SE'){
        this.calcStyle = {...baseStyle,transform: 'rotate(135deg)'}
      }else if(dir === 'S'){
        this.calcStyle = {...baseStyle,transform: 'rotate(180deg)'}
      }else if(dir === 'SW'){
        this.calcStyle = {...baseStyle,transform: 'rotate(225deg)'}
      }else if(dir === 'W'){
        this.calcStyle = {...baseStyle,transform: 'rotate(270deg)'}
      }else if(dir === 'NW'){
        this.calcStyle = {...baseStyle,transform: 'rotate(315deg)'}
      }
    },
    onArrowClick(){
      this.$emit('onArrowClick',this.dir)
    }
  }
}
</script>
<style lang="less">
@import 'index';
</style>