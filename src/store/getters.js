const getters = {
  collapsed: state => state.appMain.slideBarCollapsed,
  panes: state => state.appMain.panes,
  activeKey: state => state.appMain.activeKey,
  svgData:state=>state.channelization.svgData,
  channelData:state=>state.channelization.channelData,
  selectorStyle:state => state.channelization.selectorStyle,
  selectorOptions:state => state.channelization.selectorOptions,
  selectorVisible:state => state.channelization.selectorVisible,
  selectorType:state => state.channelization.selectorType,
  selectorDataPosition:state => state.channelization.selectorDataPosition,
  formLaneNum:state => state.channelization.formLaneNum,
  selectorOptionBusStyle:state => state.channelization.selectorOptionBusStyle,
  selectorOptionBusActive:state => state.channelization.selectorOptionBusActive,
  formRoadDir:state => state.channelization.formRoadDir,
  currentRoadData:state => state.channelization.currentRoadData,
};
export default getters