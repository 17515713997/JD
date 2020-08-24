<template>
  <div class id="search">
    <nav-bar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div slot="right" @click="toSearch">搜索</div>
    </nav-bar>
    <h1>keywords</h1>
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
/* #search {
  position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color:#fff;
    z-index: 10;
} */
</style>
