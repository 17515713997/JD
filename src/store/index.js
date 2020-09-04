//引入插件
import Vue from 'vue'
import Vuex from 'vuex'
//引入外部文件
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
Vue.use(Vuex)

const state = {
  loading:false,
  urlPath: 'http://106.12.85.17:8090/public/image',
  localData:'JD_entry_data', //用于保存本地存储数据的 key
  TabBar: {
    is_jd_TabBar: true,
    is_jx_TabBar: false,
  },
  userInfo:null,
  //keep-leave
  keepExclude: 'Details,Cart,Payment,ConfirmOrder,Order',
  keepInclude: 'Home',
  shopCartHistory:null,//在页面渲染的时候，购物车加载的时候取以下默认值，在离开购物车页面的时候，用购物车页面的值，和当前值做对比。存在的值。对比后提交数据
  shopCart: null,  //用户登录后的购物车数据
  shopCartLength:0,//购物车的数据数量
  temp:null,
  totalNum:0,//支付数量
  totalPayment:0,//支付总价
  ShoppingAddress:null,   //配送地址
  city:null,
  SKnavigation:null,//用于记录tabbar的上此 路由路径
  ShopCartMoneyAll:0,//记录购物车所有商品价钱总和
  ShopCartGoodsNum:0,//记录购物车商品总数量
  shopCartNameArr:[], // Cart2.vue 中需要的变量   --- 不使用element ui  无需考虑这里
  indexArr:{},// Cart2.vue 中需要的变量 ---不使用element ui  无需考虑这里
  area_code: "86",//国际区号
  registreDialogShow:true,   //用于控制注册页面 注册协议的显示
  areacodeHistory:'/home',   //记录一下离开页面时。的路由地址 ，默认地址为/home
  loginHistory:'/home',     //记录从那个页面跳转到登录的。
  configOrderHistory:null,  //记录离开确认订单时候的路由地址
  allAddress:null,   //  记录所有的用户地址
  payMentData:null   //存储购物车/details提交的订单 
}
const x = new Vuex.Store({
  state,      //状态管理数据
  mutations,  //定义事件
  getters,    //计算
  actions,    //异步请求
  modules: {} //模块
})
export default x
