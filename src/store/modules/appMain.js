
export default {
  // 使用命名空间
  namespaced: true,

  state: {
    slideBarCollapsed: false,
    panes:[],
    activeKey:'homePage',
    userInfo:{}
  },
  // 定义reducer
  mutations: {
    TOGGLE_COLLAPSED: state => state.slideBarCollapsed = !state.slideBarCollapsed,
    CREATE_PANES:(state,payload) => state.panes = [...payload.panes],
    TOGGLE_ACTIVE_KEY:(state,payload) => state.activeKey = payload.key,
    UPDATE_USER_INFO:(state,payload) => state.userInfo = {...payload}
  },

  actions: {
    toggleCollapsed({commit}) {
      commit('TOGGLE_COLLAPSED')
    },
    createPanes({commit},payload){
      commit('CREATE_PANES',payload)
    },
    toggleActiveKey({commit},payload){
      commit('TOGGLE_ACTIVE_KEY',payload)
    },
    updateUserInfo({commit},payload){
      commit('UPDATE_USER_INFO',payload)
    }
  }
}
