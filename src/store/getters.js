const getters = {
  collapsed: state => state.appMain.slideBarCollapsed,
  panes: state => state.appMain.panes,
  activeKey: state => state.appMain.activeKey,
  svgData:state=>state.channelization.svgData,
  channelData:state=>state.channelization.channelData,
};
export default getters