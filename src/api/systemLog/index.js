import http from 'http';
import qs from 'qs';

// 告警记录表格数据获取
export const getWarnLogData = (params) => http.post('system/log/getHistoryWarningLogs',params);

// 告警记录导出
export const exportWarnExcel = (params) => http.post('system/log/getHistoryWarningLogsExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  },
  responseType:'blob'
});

export const getOperationLogData = (params) => http.post('system/log/getSystemOperLogs',params);


// 操作记录导出
export const exportOperationExcel = (params) => http.post('system/log/getSystemOperLogsExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  },
  responseType:'blob'
});