const getters = {
  collapsed: state => state.appMain.slideBarCollapsed,
  panes: state => state.appMain.panes,
  activeKey: state => state.appMain.activeKey,
};
export default getters