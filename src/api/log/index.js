import http from 'http'
import qs from 'qs';
// 获取运行记录表格数据
export const getLogTableData = (params) => http.post('plan/history/getAllCrossHistoryPlan',params);

// 获取运行记录详情表格数据
export const getLogTableDetailData = (params) => http.post('plan/history/getCrossHistoryPlanDetail',params);

// 运行记录导出
export const exportExcel = (params) => http.post('plan/history/getAllCrossHistoryPlanExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  },
  responseType:'blob'
});

// 获取运行记录详情图表数据
export const getLogChartDetail = (params) => http.post('plan/history/getCrossHistoryPlanDetailChart',params);
export const getLogChartDetailData = (params) => http.post('plan/history/getCrossHistoryPlanDetailChartData',params);