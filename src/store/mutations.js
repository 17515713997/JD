import Vue from "vue"
import router from '../router'
// 解构赋值一个常量
// import {POST_SHOPCART} from "./mutation-types"
// 获取shopcart网络请求
import { postShopCart, addShopCart } from 'network/shopCart'
// import { postShopCart} from 'network/shopCart'
import { autoLand } from 'network/user'
//取所有的常量
import * as types from "./mutation-types"
export default {
  //回退页面
  [types.BACK]() {
    router.go(-1)
  },
  // [types.ROUTERTO](state,payload){
  //   state;
  //   console.log(payload);
  //   // router.push(data);
  // },
  //要做的是网络请求---->需要在actions中做分发监控,不然同步数据不会被改变
  //所以要把当前的事件，在actions中进行执行
  [types.POST_SHOPCART](state, payload) {
    state.totalPayment = 0;
    state.totalNum = 0;
    postShopCart(payload).then(res => {
      state.shopCart = {};
      state.shopCartHistory = {};
      console.log(res);
      if (res.code != 200) return console.log(res.msg);
      state.shopCartLength = res.data.length;
      //循环，把同一个店铺的东西分组取出来。
      res.data.forEach(item => {//循环的是所有数据
        // if (state.shopCart[item.shop_name]) {
        //   //购物车
        //   state.shopCart[item.shop_name].push(item)
        //   state.shopCartHistory[item.shop_name].push(item)
        //   // state.indexArr[item.shop_name].push(item.goods_id)
        // }else{
        //   state.shopCart[item.shop_name] = [item]
        //   state.shopCartHistory[item.shop_name] = [item]
        //   // state.shopCartNameArr.push(item.shop_name);
        //   // state.indexArr[item.shop_name] = [item.goods_id]
        // }
        if (!state.shopCart[item.shop_name]) {
          state.shopCart[item.shop_name] = []
          state.shopCartHistory[item.shop_name] = []
        }
        let a = {}, b = {};
        for (let i in item) {
          a[i] = item[i];
          b[i] = item[i];
        }
        state.shopCart[item.shop_name].push(a)
        state.shopCartHistory[item.shop_name].push(b)

        //得到选中的商品的总价
        if (item.ischeck == '1') {
          state.totalPayment += item.money_now * item.num
          state.totalNum += item.num
          // state.paymentGoods.push(item)          
          // if(state.paymentGoods[item.shop_name]){
          //   state.paymentGoods[item.shop_name].push(item);
          // }else{
          //   state.paymentGoods[item.shop_name]=[item];
          // } 
        }
        //获取所有商品的总价
        state.ShopCartMoneyAll += item.money_now * item.num
        state.ShopCartGoodsNum += item.num * 1
      })
      state.loading = false;
      // console.log(state.shopCartHistory,'shopCartHistory');
    })
  },
  //修改购物车
  [types.UPDATE_SHOPCART](state, payload) {//方法没有使用。不用定义
    console.log("被执行");
    for (let i in state.shopCart) {
      state.shopCart[i].forEach(item => {
        Vue.set(item, payload.ischeck, Number(payload.val).toString())
      })
    }
  },
  //用于国际区号页面 回退页面事件
  [types.AREA_CODE_BACK](state, payload) {
    console.log(payload);
    if (payload == 0) { // 用于 国际区号页面 返回到 注册页面
      //参数==0 的时候 国际编号 回到初始值
      state.area_code = '86'
    }
    if (payload > 0) { // 用于国际区号页面 选择地区 后 返回到注册页面
      state.area_code = payload
      state.registreDialogShow = false
    }
    if (payload < 0) {
      console.log('返回到登录');
    }
    router.go(-1);
  },
  // 用于路由跳转
  [types.ROUTERTO](state, payload) {
    state;
    router.push(payload)
  },
  //自动登录
  [types.AOTU_CODE](state, payload) {
    //localData:'JD_entry_data'
    let data = window.localStorage.getItem(state.localData)
    console.log(data);
    if (data != undefined && data != null && data != "") {
      console.log(data);
      let autocode = JSON.parse(data).autoCode
      console.log(autocode);
      if (autocode != undefined && autocode != null && autocode != '') {
        autoLand({ autocode }).then(res => {
          console.log(res);
          payload.resolve(res)
        })
      }
    }
  },
  //登录后,获取自动登录码，并设置本地存储
  [types.SET_USERINFO](state, payload) {
    console.log(payload);
    state.userInfo = {}
    for (let i in payload.data.user) {
      state.userInfo[i] = payload.data.user[i]
    }
    state.userInfo.defaddr = payload.data.defaddr
    state.ShoppingAddress = payload.data.defaddr
    //先去本地存储取值，在设置autoCode
    let data = window.localStorage.getItem(state.localData);
    data = (data != null && data != "") ? JSON.parse(data) : {}
    data.autoCode = payload.data.user.autocode;
    window.localStorage.setItem(state.localData, JSON.stringify(data))
    //如果本地存储购物车有数据，则把购物车的数据和当前用户购物车合并，并删除本地存储的购物车

    
    if (data.shopCart != undefined && data.shopCart.length > 0) {
      Promise.all([...data.shopCart.map(item => {
        item.user_id = state.userInfo.id
        return new Promise((resolve, reject) => {
          addShopCart(item).then(res => {
            if(res.code != 200) reject("添加异常")
            resolve(res)
          })
        })
      })]).then(success => {
        console.log(success);
        //在默认情况我们添加数据库的时候，添加成功数据库会默认返回一个新增的id值 给用户。


        delete data['shopCart']
        window.localStorage.setItem(state.localData, JSON.stringify(data))
        payload.success('执行刷新购物车数据')
        /*
        if(success.length  == data.shopCart.length){
          //相等带表所有数据都添加成功
          delete data['shopCart']
          window.localStorage.setItem(state.localData, JSON.stringify(data))
        }else{
          //不相等代表有数据添加失败   --->一条失败---全部都失败
          //获取后台返回的新增id  --->执行删除---> 让已经添加的数据消失。然后告诉用户。数据添加失败---网络问题等等，从新添加
          //deteldeShopCart()
          delete data['shopCart']
          window.localStorage.setItem(state.localData, JSON.stringify(data))

        }
        //对于我们来说。合并不需要那么复杂，不论成功还是失败。都删除本地存储购物车
        */
      },err=>{
        console.log(err);
      })
    }else{
      state.loading = false
    }
  },
}
