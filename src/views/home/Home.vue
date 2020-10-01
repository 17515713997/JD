<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left" v-on:click="$store.commit('ROUTERTO','/category')">分类</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容" v-on:focus="routerTo('/keywords')"></el-input>
      </div>
      <div slot="right">
        <!-- 登录前 -->
        <span v-if="!$store.state.userInfo" @click="routerTo('/login')">登录</span>
        <!-- 登录后 -->
        <span v-else class="el-icon-s-custom" @click="routerTo('/profile')"></span>
      </div>
    </nav-bar>
    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="homeScrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-rotation :cbanners="banners"></home-rotation>
      <hr />
      <!-- 功能视图 -->
      <home-feature :cfeature="feature" @cfeatureAll="routerTo('/home/feature')"></home-feature>
      <hr />
      <div style="width:100%;background:#f7f7f7;float:left">
        <div  style="width:100%;background:#f7f7f7;float:left">
          <span style="float: left;padding:10px">京东秒杀</span>
          <span style="float: right;padding:10px;color:red">更多秒杀</span>
        </div>
        <div style="width:200%;float:left" v-if=aa>
          <ul style="width:100%;float:left" @touchstart='touchstart' @touchmove='touchmove'>
            <li style="float:left;width:60px;margin-left:20px;" v-for="(item,index) in miaosha" :key="index">
              <img :src="pathhtap+item.img_cover"  style="float: left;width:60px;height:60px">
              <p style="float:left;width:100%;padding-top:10px;color:red">￥{{item.money_now}}</p>
              <s style="float:left;width:100%;padding-top:5px;color:#ccc">￥{{item.money_old}}</s>
            </li>
          </ul>
        </div>
      </div>
      <div style="width:100%;float:left;padding:10px 0;">
        <img src="../../assets/imgg/xinren.png" width="100%" height="100%">
      </div>
      <div style="width:100%;float:left;padding:10px 0;">
        <img src="../../assets/imgg/yiyuan.webp" width="100%" height="100%">
      </div>
      <div style="width:100%;float:left;padding:10px 0;">
        <img src="../../assets/imgg/ri.jpg" width="100%">
        <ul style="width:100%;float:left">
          <li style="float:left;width:25%;" v-for="(item,index) in Arra" :key="index">
            <h3 style="background: linear-gradient(to right, red, blue);-webkit-background-clip: text;color: transparent;"> {{item}}</h3>
            <!-- <img :src="item.img" alt=""> -->
          </li>
        </ul>
      </div>
      <div>
        <button style="width:100%" @click="changeDirection">改变商品数据排列</button>
      </div>
      <div class="tabContent">
        <div class="tabTitle">
          <button @click="tabClick('recommend')">recommend</button>
          <button @click="tabClick('news')">news</button>
        </div>
        <goods-list
          :cgoods="showGoodsList"
          :cpath="path"
          :cisDirection="parentDirection"
          :bus="bus"
        ></goods-list>
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>
  </div>
</template>

<script>
//引入公共组件
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目....
import Scroll from "components/contents/scroll/Scroll";
import GoodsList from "components/contents/goods/GoodsList";
// import GoodsList1 from "components/contents/goods/GoodsList1";
//引入当前组件的子组件
import HomeRotation from "./childComp/HomeRotation";
import HomeFeature from "./childComp/HomeFeature";
// import {getHomeBanner} from "network/home"
import { debounce } from "common/utils";
//引入其他文件
import { ROUTERTO, SET_USERINFO } from "store/mutation-types";

//引入网络请求模块部分组件/方法
import { getHomeBanner, getFeature } from "network/home";

import { goods_all } from "network/details";

//取商品数据
import { getGoods } from "network/goods";
import { autoLand } from "network/user";
export default {
  name: "Home",
  data() {
    return {
      aa:false,
      Arra:["免息星球","每日特价","品牌闪购","京东直播","排行榜","拍拍好物","新品首发","发现好货"],
      // Arra:{
      //   name:["免息星球","每日特价","品牌闪购","京东直播","排行榜","拍拍好物","新品首发","发现好货"],
      //   name1:["白条免息购","9块9疯抢","汇大牌好价","边看边买","热销推荐","二手优品","京东小魔方","教你买买买"]
      //   img:["../../assets/imgg/img1.jpg","../../assets/imgg/img2.jpg","../../assets/imgg/img3.jpg","../../assets/imgg/img4.jpg","../../assets/imgg/img5.jpg","../../assets/imgg/img6.jpg","../../assets/imgg/img7.jpg","../../assets/imgg/img8.jpg"]
      // },
      path: "http://106.12.85.17:8090/public/image",
      pathhtap: "http://106.12.85.17:8090/public/image/goods/",
      banners: null,
      feature: [],
      input: "",
      num: 500,
      isShowBackTop: false,
      //接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: [],
        },
        news: {
          page: 10,
          list: [],
        },
      },
      tabCurrentType: "recommend", //当前被选中tab按钮的类型
      parentDirection: true, // goods展示的时候是否切换横向/纵向展示
      isLoadmore: true, //是否加载更多
      bus: "homeImageLoad",
      saveY: 0, //保存滚动条y的值
      postData: {
        like: "", //模糊查询
        order: {
          // c2_id: "UtoD",
          // money_now: "DtoU",
        },
        minMoney: 0,
        maxMoney: 0,
        exact: {
          //精确查找
        },
      },
      positionX:0,
      positionY:0,
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    HomeRotation,
    HomeFeature,
  },
  created() {
    console.log(this.userInfo)
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature(1);
    this.getGoodsMax("recommend");
    this.getGoodsMax("news");
    this.goods_all();
    setTimeout(() =>{
      this.aa = true;
    },1000)
  },
  activated() {
    //在组件激活的时候，调整滚动条的位置。
    this.$refs.homeScrollCom.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.homeScrollCom.scrollTo1(0, this.saveY, 0);
    this.$refs.homeScrollCom.refreshScroll();
    if (!this.$store.state.userInfo) {
      console.log('执行了')
      this.auto_code();
    }
  },
  deactivated() {
    //在组件离开的时候，记录滚动条的位置
    this.saveY = this.$refs.homeScrollCom.scroll.y;
    // console.log(this.saveY);
  },
  computed: {
    //显示的goods是哪一个
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
    localPath() {
      return this.$store.state.localData;
    },
    userInfo(){
      return this.$store.state.userInfo
    },
  },
  methods: {
    //取banner的数据
    getHomeBanner() {
      getHomeBanner().then((res) => {
        // if(res.data != 200) return;
        this.banners = res.data;
        console.log(this.banners);
      });
    },
    goods_all() {
      goods_all().then((res) => {
        this.miaosha= res.data.slice(15, 25)
        console.log(this.miaosha)
      });
    },
    //定义功能视图的数据
    getFeature() {
      getFeature().then((res) => {
        console.log(res);
        //if (res.code != 200) return console.log("getFeature没有请求到数据");
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? this.feature[i].push(item) : "";
          });
        }
      });
    },
    //获取滚动条滚动的值
    HomeScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    //回到顶部
    toTop() {
      this.$refs.homeScrollCom.scrollTo1(0, 0, 300);
    },
    //取出home页现实的goods数据
    getGoodsMax(type) {
      // let page = this.goods[type].page + 1;
      let data = {
        page: this.goods[type].page + 1,
        pagesize: 10,
      };
      getGoods(data).then((res) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.homeScrollCom.finishpullup();
        this.isLoadmore = true; //获取到一次数据后isLoadmore 才变为true，才能进行下一次请求
      });
    },
    //加载更多数据
    loadMore() {
      if (!this.isLoadmore) return; //如果this.isLoadmore 则代表上一次请求没完成。不能下一次请求
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    //点击切换
    tabClick(type) {
      this.tabCurrentType = type;
    },
    //路由跳转
    routerTo(path) {
      this.$store.commit(ROUTERTO, path);
    },
    //切换功能视图横纵向展示事件
    changeDirection() {
      this.parentDirection = !this.parentDirection;
    },
    //获取购物车数据，调用vuex中actions的数据
    getShopCart(data) {
      if (data != "" && data != null && data != undefined) {
        this.$store.dispatch("getShopCart", data);
      }
    },
    //默认进入页面的时候。都是从首页进入。
    auto_code() {
      //先去本地存储取值。
      let data = window.localStorage.getItem(this.localPath);
      //取到的值，不等于 null  则继续执行
      console.log(data);
      if (data == null || data == "") return;
      let autocode = JSON.parse(data).autoCode;
      console.log(autocode);
      autoLand({
        autocode: autocode,
      }).then((res) => {
        console.log(res);
        if (res.code != 200) return;
        this.$store.commit(SET_USERINFO, res); // 每次都更改登录码
        this.getShopCart(res.data.user.id);
      });
    },
    touchstart (e) {
      // 如果你要阻止点击事件，请反注释下一行代码
      // e.preventDefault()
      this.startX = e.touches[0].clientX
      console.log(this.startX)
      this.startY = e.touches[0].clientY
      console.log(this.startY)
    },
    touchmove (e) {
      // e.preventDefault()
      this.moveX = e.touches[0].clientX
       console.log(this.moveX)
      this.moveY = e.touches[0].clientY
       console.log(this.moveY)
      this.startX - this.moveX <= 0 ? console.log('你在往右滑') : console.log('你在往左滑')
      //if (this.startX - this.moveX <= -100) { // 右滑触发
      // }
    }    
  },
  mounted() {
    // 使用防抖方法，放置图片刷新被多次循环调用，在指定事件内，如果没有图片加载完成，我们在刷新scroll高度
    const refresh = debounce(this.$refs.homeScrollCom.refreshScroll, 50);
    this.$bus.$on(this.bus, () => {
      //当图片加载完成 在GoodsListItem中通过$bus总线 执行 当前方法 goodsImageLoad ,
      //然后对BScroll  进行重新计算高度
      // this.$refs.homeScrollCom.refresh(); // this.$refs.homeScrollCom   =>> 没找到 refresh方法()
      refresh();
    });
  },
  //当离开页面的时候
  beforeRouteLeave(to, from, next) {
    //如果去的页面时login 页面。 则记录页面
    if (to.path == "/login") this.$store.state.loginHistory = from.path;
    next();
  },
  filters: {
    changePrice: (data, str) => {
      return str + data;
    },
  },
};
</script>
<style scoped lang="less">
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.homeContent {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  /* height:calc(100vh - 93px); */
  overflow: hidden;
}
.toTop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  /* background-color: red; */
  background-image: url(~assets/img/common/top.png);
  display: block;
  width: 40px;
  height: 40px;
  background-size: 100%;
}
.tabContent {
  display: flex;
  flex-wrap: wrap;
}
.tabContent .tabTitle {
  width: 100%;
  display: flex;
}
.tabContent .tabTitle button {
  width: 50%;
  height: 40px;
  flex: 1;
}
.tabContent div {
  width: 100%;
}
.tabContent div ul {
  width: 100;
}
.tabContent div ul li img {
  width: 30%;
}
// .center{
//   div{
//     div{
//       input{
//         border-radius: 20px;
//         height:20px;
//       }
//     }
//   }
// }
</style>
