<template>
  <div class="elocSelect">
    <div class="elocSelect-input-wrapper">
      <input
        class="elocSelect-input"
        type="text"
        :autofocus="foucsState"
        @click.stop="click"
        :value="crossInfo"
        @keyup.enter="getCrossInfo"
        @change="$emit('change',$event.target.value)"
        :placeholder="placeholder"
      />
      <i :class="elocSelectIcon"></i>
    </div>
    <transition name="eloc-zoom-in-top">
      <div class="elocSelect-tree" v-if="foucsState">
        <el-tree :data="treeData" :props="defaultProps" @node-click="nodeClick" />
      </div>
    </transition>
  </div>
</template>  
<script>
import { getCrossInfoByFuzzySearch } from "api/homePage";
import { conversionTreeData } from "utils/utils";
export default {
  props: {
    label: {
      type: String,
      default() {
        return "";
      }
    },
    value: {
      type: String
    },
    placeholder:{
      type:String,
      default() {
        return "";
      }
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    value: function(val) {
      this.crossInfo = val;
    }
  },
  data() {
    return {
      foucsState: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      elocSelectIcon: {
        "el-icon-caret-bottom": true,
        "eloc-select-icon-up": false,
        "eloc-select-icon-down": true
      },
      crossInfo: this.value
    };
  },
  mounted() {
    window.addEventListener("click", () => {
      this.pickUp();
    });
    this.getCrossInfo();
  },
  methods: {
    click() {
      this.foucsState = true;
      this.elocSelectIcon = {
        "el-icon-caret-bottom": true,
        "eloc-select-icon-up": true,
        "eloc-select-icon-down": false
      };
    },
    pickUp() {
      this.foucsState = false;
      this.elocSelectIcon = {
        "el-icon-caret-bottom": true,
        "eloc-select-icon-up": false,
        "eloc-select-icon-down": true
      };
    },
    getCrossInfo() {
      const crossInfo = this.crossInfo;
      getCrossInfoByFuzzySearch({ crossInfo }).then(res => {
        this.treeData = conversionTreeData(res.msg);
      });
    },
    nodeClick(data) {
      if (!data.children) {
        this.crossInfo = data.title;
        this.pickUp();
        this.$emit("change", this.crossInfo);
      }
    },
  }
};
</script>  
<style lang="less">
@import "index";
</style>