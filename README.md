# vuedemo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
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





+   public 
    +   1       干嘛的
    +   2       干嘛的
+   src
    +   assset  静态不打包文件
    +   components  公共组件   
        +   common  和业务无关的组件
            +   featrue     功能视图组件   
            +   navbar      导航组件
            +   rotation    轮播组件
            +   tabbar      底部标签页组件
        +   contents和当前项目业务有关的文件
            +   MainTabbar  主页底部按钮整合组件
            +   scroll      页面滚动组件
            +   tabControl  标签控制器组件 -----按钮切换
            +   goods       商品展示组件
    +   netWork     网络请求组件
        +   category.js     分类页请求
        +   home    主页请求
        +   request     网络请求配置封装  ------   request方法
        +   tabbar      底部标签也数据请求
    +   router 
        +   index.js    主配置
    +   store   vuex状态管理
        index.js    状态管理主配置
    +   views       视图页面
        +   cart    购物车页面
        +   category    分类页面
        +   details     详情页面
        +   home        主页面
        +   jx          惊喜页面
        +   login       登录页面
        +   profile     我的页面
    +   app.vue     主入口文件
    +   main.js     主入口js文件
+   .editorconfig
+   .gitignore      git控制文件
+   package.json    webpack基础文件
+   vue.config.js   vue补充配置文件


测试
测试2 

    

