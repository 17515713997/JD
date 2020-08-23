<template>
  <div id="jx">
    <!-- 定位的tabcontrol -->
    <tab-control
      controlId='tabCon1'
      :titleArr="titleArr"
      :column="titleArr.length"
      ref="tabCon1"
      class="tabCon1"
      v-show="isTabFiexd"
    />
    <!-- 滚动区域 -->
    <scroll
      class="jxContent"
      :probeType="3"
      ref="jxScrollCom"
      :pullUpLoad="true"
      @parentScroll="positionScroll"
    >
      <nav-bar class="jx-nav-bar">
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">惊喜</div>
        <div slot="right">
          <el-col>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/home" icon="el-icon-house">首页</el-dropdown-item>
                <el-dropdown-item command="/keywords" icon="el-icon-search">分类搜索</el-dropdown-item>
                <el-dropdown-item command="/cart" icon="el-icon-shopping-cart-1">购物车</el-dropdown-item>
                <el-dropdown-item command="/profile" icon="el-icon-check">我的京东</el-dropdown-item>
                <el-dropdown-item command='/profile' icon="el-icon-notebook-1">浏览记录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
      </nav-bar>
      <hr />
      <!-- 轮播图 -->
      <jx-rotation :cbanners="banners" @imgLoad="bannerImgLoad" />
      <hr />
      <!-- 功能视图 -->
      <jx-feature :cfeature="feature" :iscopy="iscopy" />

      <!-- tabcontrol 和 list图片 -->
      <div style="height:50000px">
        <!-- 静态的tabcontrol -->
        <tab-control
          controlId='tabCon2'
          :titleArr="titleArr"
          :column="titleArr.length"
          @tabClick="tabClick"
          ref="tabCon2"
        />
        <goods-list
          :cgoods="showGoodsList"
          :cpath="path"
          :cisDirection="parentDirection"
          :bus="bus"
        ></goods-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目有关的组件
import Scroll from "components/contents/scroll/Scroll";
import TabControl from "components/contents/tabControl/TabControl";
import GoodsList from "components/contents/goods/GoodsList";

import JxRotation from "./childComp/JxRotation";
import JxFeature from "./childComp/JxFeature";
// import {getHomeBanner} from "network/home"

//引入网络请求模块部分组件/方法
import { getJxBanner, getJxFeature} from "network/jx";
import {getGoods} from 'network/goods'

export default {
  name: "Jx", //惊喜 惊吓
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      banners: null,
      feature: [],
      iscopy: true,
      goods: {
        recommend: {
          page: 0,
          list: [],
        },
        jd: {
          page: 10,
          list: [],
        },
      },
      titleArr: ["今日推荐", "京东商城"], //
      parentDirection: false, //是否独占一行
      tabCurrentType: "recommend", //当前被选中tab按钮的类型
      bus: "",
      isTabFiexd: false, // tab是否做定位
      tabOffsetTop: 0,
    };
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    JxRotation,
    JxFeature,
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getJxBanner();
    //获取功能视图数据
    this.getJxFeature();
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
    this.$root.$children[0].is_jd_TabBar = false;
    this.$root.$children[0].is_jx_TabBar = true;
    //获取数据
    this.getGoodsMax("recommend");
    this.getGoodsMax("jd");
  },
  mounted() {
  },
  watch:{
    isTabFiexd(newVal){
      if(newVal){
        this.$refs.tabCon1.$el.style.width = '414px';
        this.$refs.tabCon1.handleDom();
      }
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.tabCurrentType = "recommend";
          break;
        case 1:
          this.tabCurrentType = "jd";
          break;
      }
      this.$refs.tabCon1.itemIndex = index;
      this.$refs.tabCon2.itemIndex = index;
    },
    //banner图片加载完处理的事件
    bannerImgLoad() {
      //获取tab距离页面顶部的高度  offsetTop
      this.tabOffsetTop = this.$refs.tabCon2.$el.offsetTop + 100;
    },
    positionScroll(position) {
      // console.log(this.$refs.tabCon2.$el.offsetTop);
      //1. 回到顶部的按钮显示
      //2. tabControl  变成吸顶条
      //在滑动的时候，判断 tab距离页面的高度 小于 滚动的高度
      this.isTabFiexd = -position.y > this.tabOffsetTop;
    },
    //element ui  事件
    handleCommand(command) {
      console.log(command);
      this.$message("click on item " + command);
      this.$router.push(command);
    },

    //--------------------------------取数据------------------
    //去banner的数据
    getJxBanner() {
      getJxBanner().then((res) => {
        console.log(res);
        this.banners = res.data;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getJxFeature() {
      let that = this;
      getJxFeature().then((res) => {
        console.log(res);
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          that.feature.push([]);
          // arr.map((item,index)=>{
          //   parseInt(index/10) == i ? that.feature[i].push(item):""
          // })
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? that.feature[i].push(item) : "";
          });
        }
        console.log(this.feature);
      });
    },
    //取商品数据
    getGoodsMax(type) {
      let data = {
        page:this.goods[type].page + 1
      }
      getGoods(data).then((res) => {
        // console.log(res);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.jxScrollCom.finishpullup();
        console.log(this.$refs.jxScrollCom);
        this.isLoadmore = true; //获取到一次数据后isLoadmore 才变为true，才能进行下一次请求
      });
    },
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
  },
};
</script>
<style scoped>
#jx {
  height: 100vh;
}
.jxContent {
  height: calc(100vh - 49px);
  overflow: hidden;
}
.jx-nav-bar {
  background-color: #e43130;
  color: white;
}
.tabCon1{
  position: fixed;
  z-index:10;
  left:0;
  top:0;
  right:0;
  height:49px;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-dropdown-menu{
  background-color:#000;
  border:none;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item{
  text-align: left;
  color:#fff !important;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color:#000;
}
</style>
