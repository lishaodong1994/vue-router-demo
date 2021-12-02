module.exports = {
    lintOnSave: false,//暂时关闭eslint
    // 配置代理服务器
    devServer: {
        //before: require('./mock/index.js')
        proxy: {
           '/mock':{
               target:'http://localhost:9090/mock'
           }
        }
    },
    // 配置路径别名
    configureWebpack:{
        resolve:{
            alias:{'assets':'@/assets' }
        }
    }
}