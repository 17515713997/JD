import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// console.log(store)
Vue.use(ElementUI);
//定义一个`全局`可以使用的$bus总线   ---->需要通过原型为Vue添加一个总线属性
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


