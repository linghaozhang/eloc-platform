import http from 'http'
import qs from 'qs';

export const getRoadTopologyInfo = (params) => http.post('/systemManage/roadTopology/getRoadTopologyInfo',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const getCrossNoById = (params) => http.post('system/device/getSlcCrossById',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const getCrossBranchDir = (params) => http.post('systemManage/roadTopology/getCrossBranchDir',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const saveTopologyInfo = (params) => http.post('systemManage/roadTopology/saveTopologyInfo',params)


export const getRoadTopologyInfoByNo = (params) => http.post('systemManage/roadTopology/getRoadTopologyInfoByNo',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const getRoadTopologyExcel = (params) => http.post('systemManage/roadTopology/getRoadTopologyExcel',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  },
  responseType:'blob'
})

export const deleteBRT = (params) => http.post('systemManage/roadTopology/deleteTopologyInfo',qs.stringify(params),{
  headers: {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  }
})