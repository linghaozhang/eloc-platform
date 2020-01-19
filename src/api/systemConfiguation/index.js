import http from 'http';

// 地图校时表格初始化
export const initProofreading = () => http.post('/system/param/getGisSetting');

export const getCaliTime = () => http.post('/system/param/getCaliTime');


export const updateCrossSlcTime = (params) => http.post('/system/param/updateCrossSlcTime',params);

export const setCrossSlcTime = (params) => http.post('/system/param/setCrossSlcTime',params);

export const getWarningParam = () => http.post('/system/param/getWarningParam');

export const updateWarningParam = (params) => http.post('/system/param/updateWarningParam',params);

export const getServiceMonitor = () => http.post('/system/param/getServiceMonitor');


