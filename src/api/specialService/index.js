import http from 'http'

export const getVipTask = (params) => http.post('specialService/getVipTask',params);
