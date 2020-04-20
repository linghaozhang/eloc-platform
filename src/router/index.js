import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMain from '@/layout/AppMain.vue'
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  {//登陆
    path: '/login',
    name: 'login',
    component: () => import('pages/login'),
  },
  {//首页
    path: '/',
    component: AppMain,
    redirect: '/homePage',
    children: [{
      path: '/homePage',
      name: 'homePage',
      // component: () => import('pages/homePage'),
      meta: {title: 'homePage'}
    }]
  },
  {//基础版首页
    path: '/',
    component: AppMain,
    redirect: '/baseHomePage',
    children: [{
      path: '/baseHomePage',
      name: 'baseHomePage',
      // component: () => import('pages/homePage'),
      meta: {title: 'baseHomePage'}
    }]
  },
  {//特勤管理
    path: '/specialService',
    component: AppMain,
    redirect: '/specialService',
    children: [{
      path: '/specialService',
      name: 'specialService',
    },
      {
        path: '/taskDetail',
        name: 'taskDetail',
      },
      {
        path: '/performTask',
        name: 'performTask',
      }
    ]
  },
  {//路口工作台
    path: '/intersectionWorkbench',
    component: AppMain,
    redirect: '/intersectionWorkbench',
    children: [{
      path: '/intersectionWorkbench',
      name: 'intersectionWorkbench',
      component: () => import('pages/intersectionWorkbench'),
      meta: {title: 'intersectionWorkbench'}
    }]
  },
  {//方案定制
    path: '/schemeCustomization',
    component: AppMain,
    redirect: '/schemeCustomization',
    children: [{
      path: '/schemeCustomization',
      name: 'schemeCustomization',
      component: () => import('pages/schemeCustomization'),
      meta: {title: 'schemeCustomization'}
    }]
  },
  {//子区管理
    path: '/subareaScheme',
    component: AppMain,
    redirect: '/subareaScheme',
    children: [{
      path: '/subareaScheme',
      name: 'subareaScheme',
      component: () => import('pages/subareaScheme'),
      meta: {title: 'subareaScheme'}
    }]
  },
  {//运行记录
    path: '/log',
    component: AppMain,
    redirect: '/log',
    children: [
      {
        path: '/log',
        name: 'log',
        // component: () => import('pages/log'),
      },
      {
        path: '/logDetail',
        name: 'logDetail',
        // component: () => import('pages/log/logDetail'),
      }
    ]
  },
  {//路口工作台（基础版）
    path: '/baseIntersectionWorkbench',
    component: AppMain,
    redirect: '/baseIntersectionWorkbench',
    children: [{
      path: '/baseIntersectionWorkbench',
      name: 'baseIntersectionWorkbench',
      component: () => import('pages/baseIntersectionWorkbench'),
      meta: {title: 'baseIntersectionWorkbench'}
    }]
  },
  {//干线协调
    path: '/trunkLineCoordinate',
    component: AppMain,
    redirect: '/trunkLineCoordinate',
    children: [{
      path: '/trunkLineCoordinate',
      name: 'trunkLineCoordinate',
      component: () => import('pages/trunkLineCoordinate'),
      meta: {title: 'trunkLineCoordinate'}
    }]
  },
  {//OD态势
    path: '/ODSituation',
    component: AppMain,
    redirect: '/ODSituation',
    children: [{
      path: '/ODSituation',
      name: 'ODSituation',
      component: () => import('pages/odSituation'),
      meta: {title: 'odSituation'}
    }]
  },
  {//交通对比
    path: '/trafficContrast',
    component: AppMain,
    redirect: '/trafficContrast',
    children: [{
      path: '/trafficContrast',
      name: 'trafficContrast',
      component: () => import('pages/trafficContrast'),
      meta: {title: 'trafficContrast'}
    }]
  },
  {//数据分析
    path: '/dataAnalysis',
    component: AppMain,
    redirect: '/dataAnalysis',
    children: [{
      path: '/dataAnalysis',
      name: 'dataAnalysis',
      component: () => import('pages/dataAnalysis'),
      meta: {title: 'dataAnalysis'}
    }]
  },
  {//点位设备
    path: '/pointEquipment',
    component: AppMain,
    redirect: '/pointEquipment',
    children: [
      {
      path: '/pointEquipment',
      name: 'pointEquipment',
      // component: () => import('pages/pointEquipment'),
      meta: {title: 'pointEquipment'}
    },
    {
      path: '/intersection',
      name: 'intersection',
    }
  ]
  },
  {//系统日志
    path: '/systemLog',
    component: AppMain,
    redirect: '/systemLog',
    children: [{
      path: '/systemLog',
      name: 'systemLog',
      component: () => import('pages/systemLog'),
      meta: {title: 'systemLog'}
    }]
  },
  {//路网拓扑
    path: '/roadTopology',
    component: AppMain,
    redirect: '/roadTopology',
    children: [{
      path: '/roadTopology',
      name: 'roadTopology',
      component: () => import('pages/roadTopology'),
      meta: {title: 'roadTopology'}
    }]
  },
  {//路网拓扑
    path: '/baseRoadTopology',
    component: AppMain,
    redirect: '/baseRoadTopology',
    children: [{
      path: '/baseRoadTopology',
      name: 'baseRoadTopology',
      component: () => import('pages/baseRoadTopology'),
    }]
  },
  {//系统设置
    path: '/systemConfiguration',
    component: AppMain,
    redirect: '/systemConfiguration',
    children: [{
      path: '/systemConfiguration',
      name: 'systemConfiguration',
      // component: () => import('pages/systemConfiguration'),
    }]
  },
  {//系统设置基础版
    path: '/baseSystemConfiguration',
    component: AppMain,
    redirect: '/baseSystemConfiguration',
    children: [{
      path: '/baseSystemConfiguration',
      name: 'baseSystemConfiguration',
      // component: () => import('pages/baseSystemConfiguration'),
    }]
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router
