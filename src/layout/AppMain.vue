<template>
  <a-locale-provider :locale="locale">
    <div id="app" style="display: none;" :style="{display: 'flex'}">
      <div id="nav">
        <nav-menu @createTab="createTab"/>
        <div :class="avatarClass">
          <div class="eloc-avatar-top">
            <a-avatar
                    class="eloc-avatar"
                    shape="circle"
                    size="default"
                    src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
            <transition name="appMain-fade">
              <div class="eloc-avatar-welcome" v-show="!collapsed">
                您好，eloc
                2019-12-13
              </div>
            </transition>
          </div>
          <transition name="appMain-fade">
            <div class="eloc-avatar-bottom" v-show="!collapsed">
              <a-dropdown placement="topCenter" :trigger="['click']">
                <a class="ant-dropdown-link"> 更多功能
                  <a-icon type="creat-up"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item key="1">系统帮助</a-menu-item>
                  <a-menu-item key="2">版本信息</a-menu-item>
                  <a-menu-item key="3">关于我们</a-menu-item>
                </a-menu>
              </a-dropdown>
              <a-dropdown placement="topCenter" :trigger="['click']">
                <a class="ant-dropdown-link"> 退出登录
                  <a-icon type="creat-up"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item key="logout">确定</a-menu-item>
                  <a-menu-item key="cancel">取消</a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </transition>
        </div>
      </div>
      <div class="eloc-content" id="eloc-content">
        <top-bar/>
        <div class="eloc-content-tabs">
          <a-tabs animated hideAdd v-model="activeKey" type="editable-card" @edit="onEdit" @change="onChange">
            <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
              <keep-alive>
                <div class="eloc-tabs-container">
                  <component :is="pane.component"/>
                </div>
              </keep-alive>
            </a-tab-pane>
            <a-dropdown slot="tabBarExtraContent" :trigger="['click']">
              <a-menu slot="overlay" @click="tabMenuClick">
                <a-menu-item key="1">关闭其他标签页</a-menu-item>
              </a-menu>
              <a-button>
                <a-icon style="font-size:18px;vertical-align:inherit;line-height:35px" type="ellipsis"/>
              </a-button>
            </a-dropdown>
          </a-tabs>
        </div>
      </div>
    </div>
  </a-locale-provider>
</template>
<script>
  import {NavMenu, TopBar} from 'components/common'
  import {createNewTabData, setCookie} from 'utils/utils'
  import {multiTaskList} from 'utils/constant'
  import {mapGetters} from 'vuex'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import {getUserInfo} from 'api'

  export default {
    data() {
      return {
        activeKey: 'homePage',
        locale: zhCN
      }
    },
    components: {
      NavMenu,
      TopBar,
      homePage: () => import('pages/homePage'),
      baseHomePage: () => import('pages/baseHomePage'),
      specialService: () => import('pages/specialService'),
      intersectionWorkbench: () => import('pages/intersectionWorkbench'),
      schemeCustomization: () => import('pages/schemeCustomization'),
      subareaScheme: () => import('pages/subareaScheme'),
      log: () => import('pages/log'),
      logDetail: () => import('pages/log/logDetail'),
      baseIntersectionWorkbench: () => import('pages/baseIntersectionWorkbench'),
      trunkLineCoordinate: () => import('pages/trunkLineCoordinate'),
      ODSituation: () => import('pages/odSituation'),
      trafficContrast: () => import('pages/trafficContrast'),
      dataAnalysis: () => import('pages/dataAnalysis'),
      pointEquipment: () => import('pages/pointEquipment'),
      intersection: () => import('pages/pointEquipment/intersection'),
      systemLog: () => import('pages/systemLog'),
      roadTopology: () => import('pages/roadTopology'),
      baseRoadTopology: () => import('pages/baseRoadTopology'),
      systemConfiguration: () => import('pages/systemConfiguration'),
      taskDetail: () => import('pages/specialService/taskDetail'),
      performTask: () => import('pages/specialService/performTask'),
      baseSystemConfiguration: () => import('pages/baseSystemConfiguration')
    },
    computed: {
      ...mapGetters([
        'collapsed',
        'panes',
      ]),
      avatarClass() {
        return {
          elocAvatarContainer: true,
          closeElocAvatar: this.collapsed
        }
      }
    },
    beforeMount() {
      const sessionId = this.$route.query.SESSIONID;
      if (sessionId) setCookie('JSESSIONID', sessionId);
    },
    mounted() {
//      初始化标签页状态,根据路由选中状态生成tab页面，tab对应的菜单高亮
      const key = this.$route.path.split(['?'])[0].split('/').reverse()[0];
      this.$store.dispatch('appMain/createPanes', {panes: [createNewTabData(key)]});
      this.$store.dispatch('appMain/toggleActiveKey', {key});
      this.activeKey = key;
      this.getUserInfo()
    },
    methods: {
      getUserInfo(){
        getUserInfo().then(res=>this.$store.dispatch('appMain/updateUserInfo', {...res}))
      },
      createTab(e) {
        const panes = [...this.panes];
        let newTab = createNewTabData(e.key);
        if (multiTaskList.indexOf(e.key) !== -1) {
//          如果在重复添加列表  生成唯一key值防止重复
//          multiTaskList可重复添加为tab的列表
          newTab.key = newTab.key + '_' + this.panes.length;
          panes.push(newTab);
          panes.forEach((i, n) => i.index = n);
          this.$store.dispatch('appMain/createPanes', {panes});
          this.$store.dispatch('appMain/toggleActiveKey', {key: newTab.key})
          this.activeKey = newTab.key;
        } else {
//          不在重复添加列表，判断是否已生成过tab
          if (this.panes.filter(i => i.key === e.key).length === 0) {
            panes.push(newTab);
            this.$store.dispatch('appMain/createPanes', {panes});
//            this.panes = panes;
//            this.activeKey = newTab.key
            this.$store.dispatch('appMain/toggleActiveKey', {key: newTab.key})
            this.activeKey = newTab.key;
          } else {
//            已生成过直接指向生成的tab
            this.activeKey = newTab.key;
            this.$store.dispatch('appMain/toggleActiveKey', {key: newTab.key})
          }
        }
      },
      tabMenuClick(e) {
        if (e.key === "1") {
          if (this.panes.length === 1) {
            return this.$message.error('已经是最后一页了')
          }
          this.$store.dispatch('appMain/createPanes', {panes: [createNewTabData(this.activeKey.split('_')[0])]});
          const key = this.activeKey.split('_')[0];
          this.activeKey = key;
          this.$store.dispatch('appMain/toggleActiveKey', {key})
        }
      },
      onEdit(targetKey, action) {
        this[action](targetKey);
      },
      onChange(activeKey){
        this.$store.dispatch('appMain/toggleActiveKey', {key:activeKey});
      },
      remove(targetKey) {
        if (this.panes.length === 1) {
          return this.$message.error('已经是最后一页了')
        }
        let activeKey = this.activeKey;
        let lastIndex;
        this.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.activeKey = activeKey
        this.$store.dispatch('appMain/createPanes', {panes});
        this.$store.dispatch('appMain/toggleActiveKey', {key: activeKey})
      },
    }
  }
</script>
<style lang="less">
  @import 'AppMain';
  @import '../assets/font/iconFont';
</style>
