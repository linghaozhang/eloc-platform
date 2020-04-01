export default {
  // 使用命名空间
  namespaced: true,
  state:{
    roadPosition:[],
    channelData:[],
    svgData:[],
  },
  mutations:{
    SET_ROAD_POSITION:(state,payload) => state.roadPosition = [...payload.roadPosition],
    SET_CHANNEL_DATA:(state,payload) => state.channelData = [...payload.channelData],
    SET_SVG_DATA:(state,payload) => state.svgData = [...payload.svgData],
  },
  actions:{
    setRoadPosition({commit},payload){
      commit('SET_ROAD_POSITION',payload)
    },
    setChannelData({commit},payload){
      commit('SET_CHANNEL_DATA',payload)
    },
    setSvgData({commit},payload){
      commit('SET_SVG_DATA',payload)
    },
  }
}