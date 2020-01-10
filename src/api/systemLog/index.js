import http from 'http';
import qs from 'qs';

export const getWarnLogData = (params) => http.post('/system/log/getHistoryWarningLogs',params);

// 告警记录导出
export const exportWarnExcel = (params) => http.post('/system/log/getHistoryWarningLogsExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  },
  responseType:'blob'
});