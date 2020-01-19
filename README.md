# eloc-platform

## 关于项目
项目基于 [vue-cli](https://cli.vuejs.org/zh/guide/) 搭建，底层框架为 [Vue](https://cn.vuejs.org/) + Webpack，通过 [Vue Router](https://router.vuejs.org/zh/) 关联history和page（组件），实现页面跳转。引入[VueX](https://vuex.vuejs.org/)作为数据管理(状态管理)工具，并使用 [ES6](http://es6.ruanyifeng.com/) + [Less](http://lesscss.cn/) 作为开发语言。
组件库使用了[Ant-design](https://www.antdv.com/docs/vue/introduce-cn/) 和 [Element](https://element.eleme.cn/#/zh-CN/component/installation)


## 目录说明
```
src > api 封装接口
src > assets 静态文件
src > components 所有封装组件(按page分类，common为通用组件)
src > http 请求方法封装
src > layout 项目入口文件
src > page 所有页面逻辑和ui
src > router 路由
src > store 状态管理
src > utils 通用方法和常量
src > main.js 组件库按需引入
them 主题文件
vue.config.js webpack配置文件
```

## Project setup
download and install [Node.js](http://nodejs.cn/)
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
