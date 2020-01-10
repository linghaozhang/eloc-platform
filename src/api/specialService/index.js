import http from 'http'

export const getVipTask = (params) => http.post('specialService/getVipTask',params);

export const getVipTaskById = (params) => http.post('specialService/getVipTaskById',params);

export const getVipLineList = (params) => http.post('specialService/getVipLineList',params);

export const updateVipTask = (params) => http.post('/specialService/updateVipTask',params);

export const saveVipTask = (params) => http.post('/specialService/saveVipTask',params);

export const deleteVipLine = (params) => http.post('/specialService/deleteVipLine',params);

// 执行特勤
export const vipStart = (params) => http.post('/specialService/vipStart',params);

// 停止执行
export const vipStop = (params) => http.post('/specialService/vipStop',params);

