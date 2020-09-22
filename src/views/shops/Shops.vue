<style lang="less" scoped>
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
      width:70%;
      padding-top:10px;
      height:30px;
      line-height: 30px;
      padding-left:20px;
      float: left;
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
.el-tabs__nav-wrap{
  background: none;
}
.el-icon-arrow-left:before{
  content: "";
}
</style>
<template>
  <div class="Store">
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
      <div class="bottom">
          <input type="text" placeholder="搜索" style="text-align:center" @click="keywords">
          <el-tabs v-model="activeName" @tab-click="handleClick"  style="float:right;margin-right: 13px;">
            <el-tab-pane label="精选" name="first"> 精选</el-tab-pane>
            <el-tab-pane label="商品" name="second">商品</el-tab-pane>
            <el-tab-pane label="新品" name="third">新品</el-tab-pane>
            <el-tab-pane label="买家秀" name="fourth">买家秀</el-tab-pane>
            <el-tab-pane label="动态" name="thirdq">动态</el-tab-pane>
          </el-tabs>
          <!-- <ul>
            "精选","商品","新品", "买家秀", "动态"
            <li v-for="(item,index) in list" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
              {{item}}
            </li>
          </ul>
          <div class="tabCon">
            <div v-for='(itemCon,index) in tabContents' :key="index" v-show="index == num">
              {{itemCon}}
            </div>
          </div> -->
        </div>
    </div>
  </div>
</template>

<script>

// import NavBar from "components/common/navbar/NavBar";
// import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "Shops",
  data() {
   return {
      activeName: 'first',
          // num: 0,
          // list: [ "精选","商品","新品", "买家秀", "动态"],
          // tabContents: ["精选", "商品", "新品", "买家秀","动态"],
        }
  },
  components: {
    //组件
    // NavBar
    // Scroll
  },
  computed: {},
  created() {
    
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
     handleClick(tab, event) {
        console.log(tab, event);
      },
    keywords(){
      this.$router.push("/keywords")
    },
     getNum(index) {
        this.num = index;
     }
  },
  watch: {
    //监听
  },
};
</script>
