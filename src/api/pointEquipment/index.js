import http from 'http'
import qs from 'qs';
export const getCrossDevice = (params) => http.post('system/device/getCrossDevice',params);

export const getArea = () => http.post('system/microService/getAre');

export const getOtherParam = () => http.post('system/param/getOtherParam');

export const getCrossListInfo = (params) => http.post('system/device/getCrossListInfo',params);

export const updateSlcApi = (params) => http.post('system/device/updateSlc',params);

export const getCountDownParameter = (params) => http.post('system/device/getCountDownParameter',params);

export const setCountDownParameter = (params) => http.post('system/device/setCountDownParameter',params);

export const getEquipIdList = (params) => http.post('system/device/getEquipIdList',params);

export const queryEquipmentByType = (params) => http.post('queryEquipmentByType',params);

export const CCUQuery = (params) => http.post('systemManage/CCUInfo/CCUQuery',params);

export const crossExcel = (params) => http.post('system/device/getCrossDeviceExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  },
  responseType:'blob'
});