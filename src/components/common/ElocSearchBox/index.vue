<template>
  <div class="eloc-search-box">
    <div class="eloc-search-box-form">
      <el-input
              :placeholder="placeholder"
              class="eloc-search-box-form-input"
              v-model="searchKeyWord"
      />
      <i
              class="el-icon-circle-close eloc-search-box-form-clear"
              v-if="showDropDown"
              @click="clearSearch"
      ></i>
      <el-button
              icon="el-icon-search"
              class="eloc-search-box-form-btn"
              type="primary"
              @click="onSearch"
      />
    </div>
    <transition name="eloc-search-box-slide">
      <div class="eloc-search-box-tree" v-if="showDropDown">
        <el-tree
                :data="treeData"
                :props="defaultProps"
                @node-click="handleNodeClick"
        >
            <span class="custom-tree-node" slot-scope="{ node }">
              <img v-if="node.data.img" class="custom-tree-node-img" :src="switchMarkerImg(node.data.img)" alt="">
              <span>{{ node.label }}</span>
            </span>
        </el-tree>
      </div>
    </transition>
  </div>
</template>
<script>
  import {switchMarkerImg} from 'utils/utils'
  export default {
    data(){
      return {
        searchKeyWord:''
      }
    },
    props:{
      placeholder:{
        type:String,
        default(){
          return '请选择或输入信号机所属道路名称'
        }
      },
      showDropDown:{
        type:Boolean
      },
      treeShow:{
        type:Boolean
      },
      treeData:{
        type:Array,
        default(){
          return []
        }
      },
      defaultProps:{
        type:Object
      }
    },
    methods:{
      onSearch(){
        this.$emit('search',this.searchKeyWord);
      },
      handleNodeClick(data){
        this.$emit('nodeClick',data)
      },
      clearSearch(){
        this.$emit('clear');
        this.searchKeyWord = ''
      },
      switchMarkerImg(src) {
        return switchMarkerImg(src).t
      }
    }
  }
</script>
<style lang="less">
  @import 'index';
</style>