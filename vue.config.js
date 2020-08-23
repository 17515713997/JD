module.exports={
    configureWebpack:{
        resolve:{
            extensions:[],
            alias:{
                // "@":'/src',//默认  在2.0  @符号不能给其他别名使用
                "assets":"@/assets",
                "components":"@/components",
                "views":"@/views",
                "network":"@/network",
                "common":"@/common",//  common指的是公共的js文件夹
                'store':"@/store"
            }
        },
        // 对服务运行添加代理服务
        // baseUrl:'/',
        devServer:{
            proxy:{//代理
                '/api':{
                    target:'http://pv.sohu.com',//接口的域名,注意这里是域名，不是完整的ip;
                    changeOrigin:true,// 如果是https接口，需要配置这个参数;
                    ws:true,
                    pathRewrite:{
                        '^/api':''
                    }
                }
            }
        }
    }
}
