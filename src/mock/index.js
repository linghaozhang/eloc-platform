import Mock from 'mockjs'
import {
  getGisParams,
  setGisParams,
  getCrossList,
  getCrossTimingPlan,
  getCrossInfoByFuzzySearch,
  getCrossInfoBySpatialSearch,
  getCrossInfo,
  setBatchOperation
} from './response/homePage'
import {getNavMenu} from './response/navMenu'
import {logTableData} from './response/log'
Mock.setup({
  timeout: '200 - 400'
})
// homePage
Mock.mock(/home\/getGisParams/, 'post', getGisParams);
Mock.mock(/home\/setGisParams/, 'post', setGisParams);
Mock.mock(/home\/getCrossList/, 'post', getCrossList);
Mock.mock(/home\/getCrossInfoByFuzzySearch/, 'post', getCrossInfoByFuzzySearch);
Mock.mock(/spatial\/getSpatialCountData/, 'post', getCrossInfoBySpatialSearch);
Mock.mock(/system\/device\/getCrossInfo/, 'post', getCrossInfo);
Mock.mock(/batch\/setBatchOperation/,'post', setBatchOperation);
Mock.mock(/planManage\/common\/getCrossTimingPlan/, 'post', getCrossTimingPlan);

//nav
Mock.mock(/getUserFuncPrivBySysId\.do/, 'post',getNavMenu)

//log
Mock.mock(/plan\/history\/getAllCrossHistoryPlan/,'post',logTableData)