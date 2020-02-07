<template>
  <div :class="navClass">
    <div class="navMenu-title">
      <img src="./../../../assets/images/logo-big.png" alt="">
      <span :class="textClass">智能交通信号控制系统</span>
    </div>
    <a-menu
            @click="handleClick"
            :defaultSelectedKeys="[$route.path.split(['?'])[0].split('/').reverse()[0]]"
            :openKeys="openKeys"
            mode="inline"
            theme="dark"
            :inlineCollapsed="collapsed"
            @openChange="onOpenChange"
    >
      <template v-for="i in data">
        <a-menu-item v-if="!i.privilegeList.length" :key="i.n_id">
          <router-link :to="i.n_id">
            <a-icon :type="i.iconType"/>
            <span class="menu-title">{{i.text}}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-else :key="i.id" @titleClick="titleClick">
          <span slot="title">
            <a-icon class="menu-title" :type="i.iconType"/>
            <span class="menu-title">{{i.text}}</span>
          </span>
          <a-menu-item v-for="j in i.privilegeList" :key="j.n_id">
            <router-link :to="j.n_id">
              {{j.text}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {createIconType} from 'utils/utils'
  import {getNavMenu} from 'api/navMenu'

  export default {
    data() {
      return {
        openKeys: [],
        data: [],
      };
    },
    mounted() {
      getNavMenu().then(res => {
        this.data = res[0].privilegeList.map(i => ({
          ...i,
          iconType: createIconType(i.id)
        }));
      })
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        const rootOpenKey = this.data.map(i => i.id);
        if (rootOpenKey.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      handleClick(e) {
        this.$emit('createTab', e)
      },
      titleClick(e) {
        console.log('titleClick', e);
      },
    },
    computed: {
      ...mapGetters([
        'collapsed'
      ]),
      navClass() {
        return {
          navMenu: true,
          closeMenu: this.collapsed
        }
      },
      textClass() {
        return {
          naveSpan: true,
          hide: this.collapsed
        }
      }
    },
//    watch: {
////      openKeys(val) {
//////        console.log('openKeys', val);
////      },
//    },
  };
</script>
<style lang="less">
  @import 'index';
</style>