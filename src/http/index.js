import axios from 'axios';
import Vue from 'vue'
import router from '@/router'
import {getErrorMsg} from 'utils/utils'

const tip = (title, content) => Vue.prototype.$error({title, content,mask:false});
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};
const http = axios.create({timeout: 1000 * 12});

http.defaults.baseURL = 'http://130.3.3.42:8090/ehl-atms-eloc/';
// http.defaults.baseURL = 'http://127.0.0.1:8090/ehl-atms-eloc/';
http.defaults.withCredentials = true;
http.interceptors.response.use(
  // 请求成功
  res => {
    console.log('%c axios response => ','background:#2173cd;color:#fff',res);
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    let {data} = res;
    if (typeof data === 'string' && data.startsWith('<script')) {
      const i = data.indexOf('>');
      data = data.substr(i, data.length);
      const j = data.indexOf('<');
      data = data.substr(0, j).split('href=')[1];
      data = data.substring(1, data.length - 3);
      window.location.href = data
    } else {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if(data.code && data.code !== 0) {
        tip('请求失败',getErrorMsg(data.code)+' code : '+data.code)
        return Promise.reject(res)
      }
      return data
    }
  },
  // 请求失败
  error => {
    const {response} = error;
    tip(response.data.error+` (${response.status})`,
     `URL : ${response.config.url}`
    );
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    }
  });

export default http