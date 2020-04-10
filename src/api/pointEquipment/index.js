import http from "http";
import qs from "qs";
export const getCrossDevice = params =>
  http.post("system/device/getCrossDevice", params);

export const getArea = () => http.post("system/microService/getArea");

export const getOtherParam = () => http.post("system/param/getOtherParam");

export const getCrossListInfo = params =>
  http.post("system/device/getCrossListInfo", params);

export const updateSlcApi = params =>
  http.post("system/device/updateSlc", params);

export const getCountDownParameter = params =>
  http.post("system/device/getCountDownParameter", params);

export const setCountDownParameter = params =>
  http.post("system/device/setCountDownParameter", params);

export const getEquipIdList = params =>
  http.post("system/device/getEquipIdList", params);

export const queryEquipmentByType = params =>
  http.post("queryEquipmentByType", params);

export const CCUQuery = params =>
  http.post("systemManage/CCUInfo/CCUQuery", params);

export const queryEquipmentById = params =>
  http.post("queryEquipmentById", params);

export const queryDepartmentByDeptId = params =>
  http.post("system/microService/queryDepartmentByDeptId", params, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

export const checkCross = params =>
  http.post("system/device/checkCross", params);

export const deleteCrossInfo = params =>
  http.post("system/device/deleteCrossInfo", params);

export const saveCrossInfo = params =>
  http.post("system/device/saveCrossInfo", params);

export const getDefaultChannelData = () => http.post("getDefaultChannelData");

export const crossExcel = params =>
  http.post("system/device/getCrossDeviceExcel", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    responseType: "blob"
  });
