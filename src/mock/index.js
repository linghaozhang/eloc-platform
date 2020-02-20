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
import {logTableData,getCrossHistoryPlanDetail,getCrossHistoryPlanDetailChart,getCrossHistoryPlanDetailChartData} from './response/log'
import {getVipTask,deleteVipTask,deleteVipLine,getVipCross,saveVipTask,getVipLineById,updateVipLine,vipStart,vipStop,getVipLineList} from './response/specialService'
import {getRoadTopologyInfo,getSlcCrossById,getCrossBranchDir,saveTopologyInfo} from './response/roadTopology'
import {getCaliTime,updateWarningParam,getWarningParam} from './response/systemConfiguation'
import {getHistoryWarningLogs,getSystemOperLogs} from './response/systemLog'
import {addSystemOperLog} from './response/common'

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
Mock.mock(/plan\/history\/getCrossHistoryPlanDetail/,'post',getCrossHistoryPlanDetail)
Mock.mock(/plan\/history\/getCrossHistoryPlanDetailChart/,'post',getCrossHistoryPlanDetailChart)
Mock.mock(/plan\/history\/getCrossHistoryPlanDetailChartData/,'post',getCrossHistoryPlanDetailChartData)

//specialService
Mock.mock(/specialService\/getVipTask/,getVipTask)
Mock.mock(/specialService\/deleteVipTask/,deleteVipTask)
Mock.mock(/specialService\/deleteVipLine/,deleteVipLine)
Mock.mock(/specialService\/getVipCross/,getVipCross)
Mock.mock(/specialService\/saveVipTask/,saveVipTask)
Mock.mock(/specialService\/getVipLineById/,getVipLineById)
Mock.mock(/specialService\/updateVipLine/,updateVipLine)
Mock.mock(/specialService\/vipStart/,vipStart)
Mock.mock(/specialService\/vipStop/,vipStop)
Mock.mock(/specialService\/getVipLineList/,getVipLineList)

//roadTopology
Mock.mock(/systemManage\/roadTopology\/getRoadTopologyInfo/,getRoadTopologyInfo)
Mock.mock(/system\/device\/getSlcCrossById/,getSlcCrossById)
Mock.mock(/systemManage\/roadTopology\/getCrossBranchDir/,getCrossBranchDir)
Mock.mock(/systemManage\/roadTopology\/saveTopologyInfo/,saveTopologyInfo)

// systemConfiguation
Mock.mock(/system\/param\/getCaliTime/,getCaliTime)
Mock.mock(/system\/param\/getWarningParam/,getWarningParam)
Mock.mock(/system\/param\/updateWarningParam/,updateWarningParam)

//systemLog
Mock.mock(/system\/log\/getHistoryWarningLogs/,getHistoryWarningLogs)
Mock.mock(/system\/log\/getSystemOperLogs/,getSystemOperLogs)

// common
Mock.mock(/system\/log\/addSystemOperLog/,addSystemOperLog)
