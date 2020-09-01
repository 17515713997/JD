//引入插件
import Vue from 'vue'
import Vuex from 'vuex'
//引入外部文件
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
Vue.use(Vuex)

const state = {
  urlPath: 'http://106.12.85.17:8090/public/image',
  localData:'JD_entry_data', //用于保存本地存储数据的 key
  TabBar: {
    is_jd_TabBar: true,
    is_jx_TabBar: false,
  },
  userInfo:null,
  // userInfo:{
  //   defaddr:{id:1,user_id:'15',tel:"电话",addr:'省,市,县(乡,街道),具体地址',name:'接收人',default:1},
  //   // defaddr:null,
  //   id:'15',
  //   email:'',
  //   name:'',
  //   qq:'',
  //   wx:'',
  //   img:"",
  //   tel:'',
  //   //autocode:''//这个值后期用户登录后，服务器会给你返回一个数值，这个数值用于用户自动登录的。当本地存储中存有这个值的时候，需要拿这个值访问自动登录接口，请求用户数据
  // },
  //keep-leave
  keepExclude: 'Details,Cart,Payment,ConfirmOrder,Order',
  keepInclude: 'Home',
  shopCartHistory:null,//在页面渲染的时候，购物车加载的时候取以下默认值，在离开购物车页面的时候，用购物车页面的值，和当前值做对比。存在的值。对比后提交数据
  shopCart: null,
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
  allAddress:null   //  记录所有的用户地址
}
const x = new Vuex.Store({
  state,      //状态管理数据
  mutations,  //定义事件
  getters,    //计算
  actions,    //异步请求
  modules: {} //模块
})
export default x
