<template>
  <div id="search">
     <nav-bar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <el-input  placeholder="请输入内容"></el-input>
        <!-- v-model="input" -->
      </div>
      <div slot="right" >搜索</div>
    </nav-bar>
    <div id="toLeft">
      <div style="padding:10px 20px">
        <span style="text-align: left;">热门搜索</span>
        <span style="text-align: right;" @click="hiee" class="hiee">隐藏</span>
        <span style="text-align: right;display:none" @click="show" class="show">显示</span>
      </div>
      <ul class="ul">
          <li class="li"><a>活性炭</a></li> 
          <li class="li"><a>浴霸</a></li> 
          <li class="li"><a>除湿机</a></li> 
          <li><a>蓝牙音箱</a></li> 
          <li><a>多美鲜黄油</a></li> 
          <li><a>户外登山鞋</a></li> 
          <li><a>烧水壶</a></li>
          <li><a>餐桌</a></li> 
          <li><a>毛巾</a></li> 
          <li><a>便携桌椅</a></li> 
          <li><a>黄金项链</a></li> 
          <li><a>电脑椅</a></li> 
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Keywords",
  beforeRouteEnter(to,from,next){
    //组件创建前调用的守卫
    next()
  },
  created() {
    // console.log(this);
    // console.log(this.$root);
    this.$root.$children[0].is_jd_TabBar = false // 也可以在页面渲染的时候 改变is_jd_TabBar的值
  },
  data() {
    return {
      input: ""
    };
  },
  components: {
    NavBar
  },
  computed: {},
  methods: {
    toSearch() {
      this.$router.push("/search");
    },
    back() {
      this.$router.go(-1);
    },
    hiee(){
      document.querySelector(".ul").style.display = "none"
      document.querySelector(".hiee").style.display = "none"
      document.querySelector(".show").style.display = "block"
    },
    show(){
      document.querySelector(".ul").style.display = "block"
      document.querySelector(".hiee").style.display = "block"
      document.querySelector(".show").style.display = "none"
    },
    profile(){
      this.$router.push("/profile")
    }
  },
  mounted(){
    // this.$root.$children[0].is_jd_TabBar = false
  },
  beforeRouteUpdate(to,from,next){
    //路由改变。组件被复用。调用的守卫
    next()
  },
  beforeRouteLeave(to,from,next){
    //组件导航离开，调用的守卫
    this.$root.$children[0].is_jd_TabBar = true
    next() 
  },
};
</script>
<style scoped>
#search{
    position:fled;
    top:0;
    left:0;
    bottom:0
}
#toLeft{
  width:100%
}
#toLeft span{
  width:50%;
  display: block;
  float:left
}
#toLeft .ul {
  padding-top:30px;
}
#toLeft .ul li{
  padding:3px 10px;
  display: inline;
  color: #686868;
  background-color: #f0f2f5;
  margin:5px 5px;
  line-height: 35px;
}
#toLeft .ul .li{
color:red
}
</style>
