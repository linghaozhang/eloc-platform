import http from 'http';

// 获取地图配置
export const getGisParams = () => http.post('home/getGisParams');

// 设置地图配置
export const setGisParams = () => http.post('home/setCerterPoint');

//获取显示路口的列表
export const getCrossList = () => http.post('home/getCrossList');

//获取显示路口详情
export const getCrossTimingPlan = (params) => http.post('planManage/common/getCrossTimingPlan', params);

// 搜索路口
export const getCrossInfoByFuzzySearch = (params) => http.post('home/getCrossInfoByFuzzySearch', params);

// 框选空间搜索
export const getCrossInfoBySpatialSearch = (params) => http.post('spatial/getSpatialCountData', params);

// 获取路口详情
export const getCrossInfo = (params) => http.post('system/device/getCrossInfo',params);

export const setBatchOperation =(params) => http.post('batch/setBatchOperation',params);

