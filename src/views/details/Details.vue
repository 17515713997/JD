<style lang='less'>
#details {
  /* tabbar导航的数量*/
  /* @tabbar_length : 4;*/
  width: 100vw;
  height: 100vh;
  background-color: darkgray;
  .detailsScroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    .message {
      .shopInfo {
        border-radius: 10px;
      }
      .discount,
      .selected,
      .distribution,
      .weight,
      .service {
        display: flex;
        min-height: 40px;
        background-color: #fff;
        position: relative;
        line-height: 30px;
        padding: 5px 10px;
        .left {
          flex: 1;
          text-align: left;
          padding-left: 15px;
        }
        .right {
          flex: 5;
          text-align: left;
          .icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }
        }
      }
      .discount {
        height: 60px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .selected {
        margin-top: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .distribution {
        p {
          padding-right: 40px;
        }
      }
      .service {
        text-align: left;
        padding-right: 30px;
        background-color: rgb(223, 223, 223);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .icon {
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
    }
    .evaluate {
      border-radius: 10px;
      margin-top: 10px;
      background-color: #fff;
      text-align: left;
      padding: 5px 10px;
      .title {
        display: flex;
        margin-bottom: 10px;
        line-height: 30px;
        .user {
          flex: 7;
        }
        .time {
          flex: 2;
          text-align: left;
        }
        .value {
        }
      }
    }
  }
}
</style>
<template>
  <div id="details" v-loading="loading">
    <details-nav-bar ref="detailsNavBar" :title="titleArr"></details-nav-bar>
    <scroll class="detailsScroll" ref="DetailsScroll" @parentScroll="getScrollY" :probeType="3">
      <details-banner :dfeature="goodsImg"></details-banner>
      <div class="message">
        <details-base-info :goodsInfo="detailsGoods"></details-base-info>

        <div class="discount" @click="selected = true">
          <div class="left">优惠</div>
          <div class="right">
            <span class="icon el-icon-more-outline"></span>
          </div>
        </div>

        <div class="selected" @click="selected = true">
          <div class="left">已选</div>
          <div class="right">
            <span class="icon el-icon-more-outline"></span>
          </div>
        </div>

        <div class="distribution" @click="distribution = true">
          <div class="left">送至</div>
          <div class="right">
            <p>{{addr}}</p>
            <p>
              <span style="color:red">现货</span>
              {{deliveryNotice}}
            </p>
            <span class="icon el-icon-more-outline"></span>
          </div>
        </div>

        <div class="weight">
          <div class="left">重量</div>
          <div class="right">{{'商品重量(kg)'}}</div>
        </div>
        <div class="service" @click="service = true">
          <div class="left">服务</div>
          <span class="icon el-icon-more-outline"></span>
        </div>
      </div>
      <div class="evaluate">
        <h1 class="head">
          评价组件
          <span>好评</span>
        </h1>
        <ul>
          <li v-for="i in [1,2]" :key="i">
            <div class="title" style="padding-top:10px">
              <span class="user">用户头像+名称</span>
              <!-- 评价应为倒序排列。最新评价在最上面 -->
              <span class="time">{{evaluatetime}}</span>
            </div>
            <div class="value"
            >评价内容评价内容评价内容评价内容评价内容</div>
            <div>评价图片</div>
          </li>
          <button style="margin-top:20px;padding:10px;width:100%" @click="gengduo">查看更多</button>
        </ul>
      </div>

      <shops-info class="shopInfo" :storeinfo="shopInfo"></shops-info>
      <div style="height:800px;background-color:#fff;margin-top:10px;">
        <h1>推荐</h1>请求数据库 获取一些与当前商品相关 或者类似的数据
        <hr />推荐组件
      </div>
      <div style="height:800px;background-color:#fff;margin-top:10px;">
        <h1>详情 = 文字 + 图片的组合</h1>
      </div>
    </scroll>

    <details-tab-bar></details-tab-bar>

    <el-drawer
      direction="btt"
      :visible.sync="selected"
      :close-on-press-escape="false"
      :append-to-body="true"
      :withHeader="false"
    >
      <span>选择!</span>
    </el-drawer>
    <el-drawer
      direction="btt"
      :visible.sync="distribution"
      :close-on-press-escape="false"
      :append-to-body="true"
      :withHeader="false"
    >
      <span>送至!</span>
    </el-drawer>
    <el-drawer
      direction="btt"
      :visible.sync="service"
      :close-on-press-escape="false"
      :append-to-body="true"
      :withHeader="false"
    >
      <span>服务!</span>
    </el-drawer>
  </div>
</template>

<script>
import Scroll from "components/contents/scroll/Scroll";
//引入当前组件的子组件
import DetailsNavBar from "./childComp/DetailsNavBar";
import DetailsBanner from "./childComp/DetailsBanner";
import DetailsBaseInfo from "./childComp/DetailsBaseInfo";
import ShopsInfo from "./childComp/ShopsInfo";
import DetailsTabBar from "./childComp/DetailsTabBar";
//引入商品数据网络请求
// import {getgoods,getGoods_id} from 'network/goods'
import { getGoodsId } from "network/goods";

import { GoodsInfo, ShopInfo, SelectNorm } from "common/utils";
export default {
  name: "Details",
  props: {},
  data() {
    return {
      // path: "http://106.12.85.17:8090/public/image",
      titleArr: ["商品", "评价", "详情", "推荐"],
      detailsGoods: {},
      goodsImg: null,
      currentIndex: 0,
      saveY: 0,
      tabCenter: null,
      loading: false,
      shopInfo: null,
      selectNorm: {},
      discount: false, //优惠遮罩层，不显示
      selected: false, // 选择遮罩层 不显示
      distribution: false, // 送至遮罩层 不显示
      service: false, //服务遮罩层不显示
      nowGoods: true,
      shopCategory: "", //商铺是个体还是自营
    };
  },
  components: {
    Scroll,
    DetailsNavBar,
    DetailsBanner,
    DetailsBaseInfo,
    ShopsInfo,
    DetailsTabBar,
  },
  computed: {
    evaluatetime() {
      //评价时间
      let time = new Date();
      return (
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
      );
    },
    addr() {
      //计算地址
      if (this.$store.state.ShoppingAddress) {
        return this.setAddr();
      } else {
        return "北京市 西三环";
      }
    },
    deliveryNotice() {
      //获取一下 是 个体 还是自营
      let temp = "";
      let newTime = new Date();
      let h = newTime.getHours();
      if (this.category == "自营") {
        //自营
        if (this.nowGoods) {
          //现货
          if (h >= 0 && h < 11) temp = `11:00前下单,预计(今日)17:00前送达`;
          if (h < 23)
            temp = `23:00前下单，预计明天(${newTime.getMonth()}月${newTime.getDate()}日)送达`;
          if (h >= 23)
            temp = `11:00前下单，预计明天(${newTime.getMonth()}月${newTime.getDate()}日)送达`;
        } else {
          //异地调货
          if (h >= 0 && h < 11) temp = `11:00前下单,预计(今日)17:00前送达`;
          if (h < 23)
            temp = `23:00前下单，预计明天(${newTime.getMonth()}月${newTime.getDate()}日)送达`;
          if (h >= 23)
            temp = `11:00前下单，预计明天(${newTime.getMonth()}月${newTime.getDate()}日)送达`;
        }
      } else {
        //非自营
        if (h >= 0 && h < 11)
          temp = `11:00前下单,预计${this.setWeek(newTime, 3)}(${this.setDate(
            newTime,
            3
          )})送达`;
        if (h < 23)
          temp = `23:00前下单，预计${this.setWeek(newTime, 4)}(${this.setDate(
            newTime,
            4
          )})日送达`;
        if (h >= 23)
          temp = `11:00前下单，预计${this.setWeek(newTime, 4)}(${this.setDate(
            newTime,
            4
          )})送达`;
      }
      return temp;
    },
  },
  created() {
    // console.log(this.$router);
    //在keep-alive状态下，created()方法只执行1此，因为当前组件不会被销毁
    // console.log("details被创建");
    this.detailsId = this.$route.params.id;
    this.getGoods(this.detailsId);
    this.setWeek();
  },
  activated() {},
  mounted() {
    this.$bus.$on("toDE", (path) => {
      this.isShow = true;
      this.$refs.DetailsScroll.scroll.scrollTo(0, -path * 800, 200);
      this.$refs.detailsNavBar.currentIndex = this.titleArr[path];
    });
    this.tabCenter = this.$refs.detailsNavBar.$el.querySelector(".tabCenter");
    // console.log(this.tabCenter);
  },
  methods: {
    gengduo(){
      alert("更多");
      this.$router.push("/gengduo");
    },
    //通过id获取商品的方法
    getGoods(data) {
      //页面等待
      this.loading = true;
      getGoodsId(data).then((res) => {
        if (res.code != 200) return;
        console.log(res);
        //new 一个 商品信息 数据
        this.detailsGoods = new GoodsInfo(
          res.data.goodsData,
          res.data.shopData
        );
        //new 一个 店铺信息数据
        this.shopInfo = new ShopInfo(res.data.shopData);
        //new 一个 选择 数据
        this.SelectNorm = new SelectNorm(
          res.data.norms,
          res.data.relationGoods
        );
        // 获取轮播数据
        this.goodsImg = res.data.goodsData.img_detalis_list;
        //个体 还是 自营
        this.shopCategory = res.data.shopData.category;
        this.loading = false;
      });
    },
    //在滚动的时候计算 tabCenter的显示，以及tanCenter的显示
    getScrollY(position) {
      if (-position.y <= 0) return;
      if (-position.y < 0) this.tabCenter.style.display = "none";
      else this.tabCenter.style.display = "flex";
      this.$refs.detailsNavBar.$el.style.background = `rgba(255,255,255,${
        -position.y / 100
      })`;
      this.tabCenter.style.opacity = `${-position.y / 100}`;
      this.tabCenter.style.filter = `opacity(${-position.y})`;
      this.$refs.detailsNavBar.currentIndex = this.titleArr[
        parseInt(-position.y / 800)
      ];
    },
    //tabCenter 点击后跳转滚动条位置

    // 设置一下送至的地址
    setAddr() {
      let address = this.$store.state.ShoppingAddress;
      let arr = address.takeover_addr.split(",");
      arr.pop();
      let temp = [];
      console.log(arr);
      for (let elem of arr.values()) {
        if (temp.indexOf(elem) == -1) {
          temp.push(elem);
        }
      }
      if (temp.length == 3) temp.pop();
      return temp.join(" ");
    },
    setDate(nowtime = new Date(), val = 1) {
      let calculationTime = new Date(
        nowtime.getTime() + val * 24 * 60 * 60 * 1000
      );
      let a = `${calculationTime.getMonth()}月${calculationTime.getDate()}日`;
      return a;
    },
    setWeek(nowtime = new Date(), day = 4) {
      let setDay = nowtime.getDay();
      if (setDay + day > 7) {
        return "下周" + num(setDay + day - 7);
      } else {
        return "本周" + num(setDay + day);
      }
      //取值
      function num(temp) {
        let a = "";
        switch (temp) {
          case 7:
            a = "日";
            break;
          case 1:
            a = "一";
            break;
          case 2:
            a = "二";
            break;
          case 3:
            a = "三";
            break;
          case 4:
            a = "四";
            break;
          case 5:
            a = "五";
            break;
          case 6:
            a = "六";
            break;
        }
        return a;
      }
    },
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    },
  },
};
</script>

