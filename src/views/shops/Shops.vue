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
          <ul>
            <li v-for="(item,index) in list" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
              {{item}}
            </li>
          </ul>
          <div class="tabCon">
            <div v-for='(itemCon,index) in tabContents' :key="index" v-show="index == num">
              {{itemCon}}
            </div>
            <!-- <div v-show=" num == false">1</div>
            <div v-show=" num == false">2</div>
            <div v-show=" num == false">3</div>
            <div v-show=" num == false">4</div>
            <div v-show=" num == false">5</div> -->
          </div>
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
          num: 0,
          list: [ "精选","商品","新品", "买家秀", "动态"],
          tabContents: ["精选", "商品", "新品", "买家秀","动态"],
        }
  },
  components: {
    //组件
    // NavBar
    // Scroll
  },
  computed: {},
  created() {
    let a = [
      {
        goods_id: "7",
        goods_name:
          "舌里%20蛋黄酥12枚装雪媚娘饼干蛋糕早餐代餐网红面包休闲零食小吃500g/箱",
        money_now: "19.9",
        money_old: "25",
        norm: "{}",
        num: 1,
        shop_id: 8,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
      {
        goods_id: "21",
        goods_name:
          "南极人女鞋夏季气垫鞋休闲鞋女士飞织透气女时尚学生板鞋运动跑步鞋韩版百搭潮鞋网鞋镂空",
        money_now: "73",
        money_old: "80",
        norm: "{}",
        num: 1,
        shop_id: 4,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
    ];
    console.log(a);
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
