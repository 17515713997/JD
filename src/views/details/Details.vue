<template>
  <div id="details">
    <details-nav-bar ref='detailsNavBar' :title='titleArr'></details-nav-bar>
    <scroll class="detailsScroll" ref="DetailsScroll" @parentScroll="getScrollY" :probeType="3">
      <div style="height:800px;">
        <details-rotation :dfeature="goodsImg"></details-rotation>

      </div>
      <div style="height:800px;">评价组件</div>
      <div style="height:800px;">详情组件</div>
      <div style="height:800px;">推荐组件</div>
    </scroll>
    <!-- 手动轮播 -->
    <details-tab-bar></details-tab-bar>
  </div>
</template>

<script>

import Scroll from "components/contents/scroll/Scroll";
//引入当前组件的子组件
import DetailsNavBar from "./childComp/DetailsNavBar";
import DetailsRotation from "./childComp/DetailsRotation";
import DetailsTabBar from "./childComp/DetailsTabBar";
//引入商品数据网络请求
// import {getgoods,getGoods_id} from 'network/goods'
import { getGoodsId } from "network/goods";
export default {
  name: "Details",
  props: {},
  data() {
    return {
      // path: "http://106.12.85.17:8090/public/image",
      titleArr: ["商品", "评价", "详情", "推荐"],
      detailsGoods: {},
      goodsImg: null,
      currentIndex:0,
      saveY: 0,
      tabCenter: null,
    };
  },
  components: {
    DetailsNavBar,
    Scroll,
    DetailsRotation,
    DetailsTabBar,
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteUpdate(to, from, next) {
    alert("details被复用");
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(from.path,"离开details",to.path);
    next()
  },
  computed: {},
  created() {
    // console.log(this.$router);
    //在keep-alive状态下，created()方法只执行1此，因为当前组件不会被销毁
    // console.log("details被创建");
    this.detailsId = this.$route.params.id;
    this.getGoods(this.detailsId);
  },
  activated() {},
  mounted() {
    this.$bus.$on("toDE", (path) => {
      this.isShow = true;
      this.$refs.DetailsScroll.scroll.scrollTo(0, -path * 800, 200);
      this.$refs.detailsNavBar.currentIndex = this.titleArr[path];
    });
    this.tabCenter = this.$refs.detailsNavBar.$el.querySelector('.tabCenter');
    console.log(this.tabCenter);
  },
  methods: {
    //通过id获取商品的方法
    getGoods(data) {
      getGoodsId(data).then((res) => {
        if (res.code != 200) return;
        this.detailsGoods = { ...res.data.goodsData };
        this.goodsImg = res.data.goodsData.img_detalis_list;
      });
    },
    //在滚动的时候计算 tabCenter的显示，以及tanCenter的显示
    getScrollY(position) {
      if (-position.y <= 0) return;
      // if (!this.$refs.center) return;
      // this.tabCenter = this.$refs.center;
      // if (-position.y < 100 && -position.y > 0 && this.tabCenter) {
      //   this.tabCenter.style.opacity = `${-position.y / 100}`;
      //   this.tabCenter.style.filter = `opacity(${-position.y})`;
      // } else if (-position.y > 100) {
      //   this.tabCenter.style.opacity = `1`;
      //   this.tabCenter.style.filter = `opacity(100)`;
      // }

      if (-position.y < 0) this.tabCenter.style.display = "none";
      else this.tabCenter.style.display = "flex";

      this.$refs.detailsNavBar.$el.style.background = `rgba(255,255,255,${
        -position.y / 100
      })`;
      this.tabCenter.style.opacity = `${-position.y / 100}`;
      this.tabCenter.style.filter = `opacity(${-position.y})`;
      this.tabCenter.style.opacity = `1`;
      this.tabCenter.style.filter = `opacity(100)`;
      this.$refs.detailsNavBar.currentIndex = this.titleArr[parseInt(-position.y / 800)];
    },
    //tabCenter 点击后跳转滚动条位置
    
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    },
  },
};
</script>
<style lang='less'>
#details {
  /* tabbar导航的数量*/
  /* @tabbar_length : 4;*/
  width: 100vw;
  height: 100vh;
  
  .detailsScroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
}
</style>
