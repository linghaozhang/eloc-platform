import http from 'http'

export const getVipTask = (params) => http.post('specialService/getVipTask',params);

export const getVipTaskById = (params) => http.post('specialService/getVipTaskById',params);