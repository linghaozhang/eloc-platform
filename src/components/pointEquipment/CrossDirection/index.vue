<template>
  <div class="crossDirection-wrapper">
    <div class="crossDirection-wrapper-comp">
      <div class="crossDirection-circle-blue">
        <div class="crossDirection-circle-white">
          <div class="crossDirection-small-wrapper">
            <div class="crossDirection-small-wrapper-comp">
              <div class="crossDirection-center">
                <cross-direction-arrow
                  v-for="i in directoinData"
                  :key="i.dir"
                  :dir="i.dir"
                  :selected="i.selected"
                  @onArrowClick="onArrowClick"
                />
                <div class="crossDirection-center-inner">
                  <div class="crossDirection-center-inner-white">
                    <div class="crossDirection-center-inner-blue">
                      <div class="crossDirection-plus-tran"></div>
                      <div class="crossDirection-plus-ver"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CrossDirectionArrow from "components/pointEquipment/CrossDirectionArrow";
export default {
  data() {
    return {
      directoinData: [
        { dir: "N", selected: true },
        { dir: "NE", selected: false },
        { dir: "E", selected: true },
        { dir: "SE", selected: false },
        { dir: "S", selected: true },
        { dir: "SW", selected: false },
        { dir: "W", selected: true },
        { dir: "NW", selected: false }
      ]
    };
  },
  components: {
    CrossDirectionArrow
  },
  methods: {
    onArrowClick(dir) {
      console.log(dir);
      this.directoinData = this.directoinData.map(i => {
        if (i.dir === dir) {
          i.selected = !i.selected;
        }
        return i;
      });
    },
    getDirectoinData(){
      this.$emit('getDirectoinData',this.directoinData)
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>