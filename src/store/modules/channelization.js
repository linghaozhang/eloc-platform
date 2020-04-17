export default {
  // 使用命名空间
  namespaced: true,
  state:{
    roadPosition:[],
    channelData:[],
    svgData:[],
    selectorStyle:{},
    selectorOptions:[],
    selectorVisible:false,
    selectorType:'',//1 路标选择器
    selectorDataPosition:{},
    formLaneNum:'',
    selectorOptionBusStyle:{},
    selectorOptionBusActive:false,
    formRoadDir:'',
    currentRoadData:{},
    formConnectionTerminal:"",
  },
  mutations:{
    // 设置渠化svg锚点坐标
    SET_ROAD_POSITION:(state,payload) => state.roadPosition = [...payload.roadPosition],
    // 赋值渠化数据
    SET_CHANNEL_DATA:(state,payload) => state.channelData = [...payload.channelData],
    // 赋值渠化绘制数据
    SET_SVG_DATA:(state,payload) => state.svgData = [...payload.svgData],
    // 设置通用选择器定位
    SET_SELECTOR_STYLE:(state,payload)=> state.selectorStyle = {...payload.selectorStyle},
    // 设置通用选择器选项
    SET_SELECTOR_OPTIONS:(state,payload)=> state.selectorOptions = [...payload.selectorOptions],
    // 更改通用选择器显示隐藏
    CHANGE_SELECTOR_VISIBLE:(state,payload)=> state.selectorVisible = payload.selectorVisible,
    // 设置通用选择器类型
    SET_SELECTOR_TYPE:(state,payload)=> state.selectorType = payload.selectorType,
    // 标记单条道路在渠化数据中的位置
    SET_DATA_POSITION:(state,payload)=> state.selectorDataPosition = {...payload.selectorDataPosition},
    // 道路车道序号（只读）
    SET_LANE_NUMBER:(state,payload)=>state.formLaneNum = payload.formLaneNum,
    // 路标选择中公交专用默认值样式设置
    SET_SELECTOR_OPTION_BUS_STYLE:(state,payload)=>state.selectorOptionBusStyle = {...payload.selectorOptionBusStyle},
     // 路标选择中公交专用默认值选中状态
    SET_SELECTOR_OPTION_BUS_ACTIVE:(state,payload)=>state.selectorOptionBusActive = payload.selectorOptionBusActive,
    // 设置表单部分路口方向按钮选中状态
    SET_FORM_ROAD_DIR:(state,payload)=>state.formRoadDir = payload.formRoadDir,
    // 设置当前选中渠化数据
    SET_CURRENT_ROAD_DATA:(state,payload)=>state.currentRoadData = {...payload.currentRoadData},
    // 设置接线端子
    SET_FORM_CONNECT_TERMINAL:(state,payload)=>state.formConnectionTerminal = payload.formConnectionTerminal,

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
    setSelectorStyle({commit},payload){
      commit('SET_SELECTOR_STYLE',payload)
    },
    setSelectorOptions({commit},payload){
      commit('SET_SELECTOR_OPTIONS',payload)
    },
    changeSelectorVisible({commit},payload){
      commit('CHANGE_SELECTOR_VISIBLE',payload)
    },
    setSelectorType({commit},payload){
      commit('SET_SELECTOR_TYPE',payload)
    },
    setDataPosition({commit},payload){
      commit('SET_DATA_POSITION',payload)
    },
    setLaneNum({commit},payload){
      commit('SET_LANE_NUMBER',payload)
    },
    setSelectorOptionBusStyle({commit},payload){
      commit('SET_SELECTOR_OPTION_BUS_STYLE',payload)
    },
    setSelectorOptionBusActive({commit},payload){
      commit('SET_SELECTOR_OPTION_BUS_ACTIVE',payload)
    },
    setFormRoadDir({commit},payload){
      commit('SET_FORM_ROAD_DIR',payload)
    },
    setCurrentRoadData({commit},payload){
      commit('SET_CURRENT_ROAD_DATA',payload)
    },
    setFormConnectionTerminal({commit},payload){
      commit('SET_FORM_CONNECT_TERMINAL',payload)
    },
  }
}