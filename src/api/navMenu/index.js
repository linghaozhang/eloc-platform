import http from 'http'

//获得侧边栏导航
export const getNavMenu = () => http.post('getUserFuncPrivBySysId.do');