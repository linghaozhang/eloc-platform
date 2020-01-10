const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('pages', resolve('src/pages'))
      .set('layout', resolve('src/layout'))
      .set('utils', resolve('src/utils'))
      .set('http', resolve('src/http'))
      .set('router', resolve('src/router'))
      .set('api', resolve('src/api'))
      .set('img', resolve('src/assets'))
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          'primary-color': '#2A60FC'
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  devServer:{
    host:'0.0.0.0',
    hot:true,
    disableHostCheck:true
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}