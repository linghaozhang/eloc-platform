// 通用请求方法
import http from 'http'
import Vue from 'vue'

// socket链接
export const initSocketClient = () => {
  return http.post('home/getRabbitMqParams').then(res => {
    if (!res.result) {
      Promise.reject('Socket Client Init Error');
      return false
    }
    const params = {
      url: res.msg.mqUrl,
      username: res.msg.username,
      password: res.msg.password
    };
    window.rabbitmq.main.init(params);
  }).catch(e => Vue.prototype.$error({title: e}))
};

// 添加socket订阅
export const addSocketSubscribe = (subscribeUrl, cb) => window.rabbitmq.main.subscribe(subscribeUrl, cb);

// 获取路口状态
export const getCrossList = () => http.post('home/getCrossList')

export const getUserInfo = () => http.post('getUserInfo.do')

export const addSystemOperLog = (params) => http.post('system/log/addSystemOperLog',params)


