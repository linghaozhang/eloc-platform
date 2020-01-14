import http from 'http'
import qs from 'qs';

export const getRoadTopologyInfo = (params) => http.post('/systemManage/roadTopology/getRoadTopologyInfo',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const getCrossNoById = (params) => http.post('/system/device/getSlcCrossById',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})