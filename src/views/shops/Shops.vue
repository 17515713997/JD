<style lang="less" >
.head{
  float: left;
  width:100%;
  background:#ccc;
  height:120px;
  .fl{
    float: left;
    width: 100%;
    img{
      width:55px;
      height:55px;
      float: left;
      padding:10px;
    }
    div{
      float: left;
      width:120px;
      padding-top:20px;
      font-size: 16px;
      color:#fff;
      span{
        font-size: 12px;
        color:#fff;
        background:red;
      }
    }
    .p{
      .shou{
        float: right;
        width:90px;
        height:30px;
        border-radius: 10px;
        background:red;
        color:#fff;
        border:none;
      }
      p{
        font-size: 12px;
        margin-left: 40px;
        margin-top: 4px;
        float: left;
      }
    }
    .dian{
      width:0;
      span{
        color:#000;
        background:none;
        font-size: 16px;
      }
    }
  }
  .bottom{
    position:relative;
    float: left;
    input{
      float: left;
      width:20%;
      height: 30px;
      border-radius: 20px;
      border:none;
      margin-top:10px;
      margin-left:10px;
    }
    ul{
      padding-top:10px;
      float: left;
      margin-left: 2px;
      li{
        float: left;
        width:50px;
        color:#fff;
        font-weight: 700;
      }
    }
    .tabCon{
      float: left;
      width:100%;
      height:1000px;
      background:red;
    }
  }
}
.el-tabs__header .is_top{
  margin-left: 100px !important;
}
.el-tabs__nav-wrap{
  background: none;
}
.el-icon-arrow-left:before{
  content: "";
} 
.tuijian{
  li{
    width:33% !important;
    float: left;
    height:100%
  }
}
.el-tabs__active-bar{
  height:0;
  background-color: #E4E7ED !important;
}
.el-tabs__nav{
  width:100%;
}
.el-tabs__item{
  width:100%;
}
.bottom_box{
  margin-top:20px;
  position:fixed;
  bottom:-8px;
  width:100%;
  background: #fff;
  ul{
    width:100%;
    li{
      width:20%;
      line-height:30px;
      background:#fff;
      height:70px;
      float: left;
      img{
        display: block;
        padding-left: 32px;
        margin-top: 15px;
      }
      span{
        color:#666;
        text-decoration: none;
      }
    }
  }
}
.el-tabs__content{
  width:100%
}
.el-tabs__item{
  width:20%
}
</style>
<template>
  <div class="Store" v-if=aa>
    <div class="head" >
      <div class="fl">
        <img src="../../assets/imgg/dp.png" alt="">
        <div class=:title>王小二网络店铺
          <span>自营</span>
        </div>
        <div class="p"> 
          <button class="shou">收藏</button>
          <p>3000人收藏</p>
        </div>
        <div class="dian">
           <el-dropdown trigger="click" style="width: 95px;text-align:center;">
              <span class="el-dropdown-link">
                <i class="el-icon-more-outline el-icon-more" style="float: right;"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown">
                <el-dropdown-item command="/home">首页</el-dropdown-item>
                <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
                <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
                <el-dropdown-item command="/profile" disabled>浏览记录</el-dropdown-item>
                <el-dropdown-item command="/profile" divided>我的关注</el-dropdown-item>
                <el-dropdown-item command="/profile" divided>分享</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
      <div class="bottom" style="width: 95.3%;background:#f7f7f7;border-radius: 20px;padding: 10px;">
          <input type="text" placeholder="搜索" style="text-align:center;position:relative;z-index:1000;" @click="keywords">
          <el-tabs v-model="activeName"  class="tabs" @tab-click="handleClick"  style="width:100%;height:1980px">
            <el-tab-pane label="精选" name="first" class="el-tab">
              <img src="../../assets/imgg/beijing.png" alt="" width="100%">
              <ul class="tuijian">
                <h3 style="text-align:left;padding:10px;font-size:20px;">超值单场</h3>
                <li v-for="(item,index) in tuijian" :key="index">
                  <img :src="path+item.img_cover" alt="" style="float: left;width:135px;height:135px">
                  <p style="height:20px;line-height:20px;overflow:hidden;font-size:14px;color: #000;float: left;width: 126px;">
                    {{item.name}}
                  </p>
                  <span style="color:red;display: block;text-align: left;width: 100%;">￥{{item.money_now}}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="商品" name="second">
                <el-tabs v-model="active" @tab-click="handle" style="padding-left:25px;padding-right:25px">
                  <el-tab-pane label="默认" name="first" >
                    <ul>
                      <li v-for="(item,index) in tuijian" :key="index" style="width:100%;padding:10px 0">
                      <img :src="path+item.img_cover" alt="" style="float: left;width:130px;height:130px">
                      <p style="color:#000;overflow:hidden;height:20px;line-height:20px">
                        {{item.name}}
                      </p>
                      <span style="color:red;float:left;padding-top: 50px;">￥{{item.money_now}}</span>
                    </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane label="销量" name="second" >销量</el-tab-pane>
                  <el-tab-pane label="价格" name="third" >价格</el-tab-pane>
                  <el-tab-pane label="上新" name="fourth" >上新</el-tab-pane>
                  <el-tab-pane label="京东物流" name="fourthc" >京东物流</el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="新品" name="third">
              <ul>
                  <li v-for="(item,index) in tuijian" :key="index" style="width:50%;padding:30px 0;float:left">
                    <img :src="path+item.img_cover" alt="" style="float: left;width:200px;height:200px">
                    <p style="float: left;color:#000;height:20px;line-height:20px;overflow:hidden;width:180px;">{{item.name}}</p>
                    <span style="color:red;float:left;">￥{{item.money_now}}</span>
                  </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="买家秀" name="fourth">
              没有买家秀
            </el-tab-pane>
            <el-tab-pane label="动态" name="thirdq">
               <ul>
                  <li v-for="(item,index) in tuijian" :key="index" style="width:33%;padding:10px 0;float:left">
                    <img :src="path+item.img_cover" alt="" style="float: left;width:130px;height:130px">
                  </li>
                  <h3>没有更多动态了!!!</h3>
                </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
    <div class="bottom_box">
      <ul>
        <li @click="home()">
          <img src="../../assets/imgg/ywdh1.png" width="20" >
          <span to="/home">首页</span>
        </li>
        <li>
          <img src="../../assets/imgg/ywdh2.png" width="20">
          <span>全部商品</span>
        </li>
        <li>
          <img src="../../assets/imgg/ywdh3.png" width="20">
          <span>活动</span>
        </li>
        <li @click="cearch()">
          <img src="../../assets/imgg/ywdh4.png" width="20">
          <span>商品分类</span>
        </li>
        <li>
          <img src="../../assets/imgg/ywdh5.png" width="20">
          <span>联系客服</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { goods_all } from "network/details";
// import NavBar from "components/common/navbar/NavBar";
// import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "Shops",
  data() {
   return {
      activeName: 'first',
      active: 'first',
      path: "http://106.12.85.17:8090/public/image/goods/",
      aa:false
    }
  },
  components: {
    //组件
    // NavBar
    // Scroll
  },
  computed: {},
  created() {
    this.goods_all();
    setTimeout(() =>{
      this.aa = true;
    },1000)
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  mounted() {
    //渲染
  },
  methods: {
    goods_all() {
      goods_all().then((res) => {
        this.tuijian= res.data.slice(9, 18)
        console.log(this.tuijian)
      });
    },
    handleClick(tab, event) {
        console.log(tab, event);
    },
    handle(tab, event) {
        console.log(tab, event);
    },
    keywords(){
      this.$router.push("/keywords")
    },
    home(){
      this.$router.push("/home")
    },
    cearch(){
      this.$router.push("/category")
    }
  },
  watch: {
    //监听
  },
};
</script>
