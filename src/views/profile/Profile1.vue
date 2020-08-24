<template>
  <div>
    <h1>我的页面</h1>
    <div
      v-if="$store.state.userInfo"
      @click="$store.commit('ROUTERTO','/login')"
    >欢迎来的京东 {{$store.state.userInfo.name}}</div>
    <div v-if="!$store.state.userInfo" @click="$store.commit('ROUTERTO','/login')">去登录</div>
    <div v-else @click="signOut">退出</div>
  </div>
</template>
<script>
export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    //组件创建前调用的守卫
    next();
  },
  data() {
    return {};
  },
  created(){
    if( !this.$store.state.userInfo){
      this.$store.commit('AOTU_CODE')
    }
  },
  //当离开页面的时候
  beforeRouteLeave(to, from, next) {
    //如果去的页面时login 页面。 则记录页面
    if (to.path == "/login") this.$store.state.loginHistory = from.path;
    next();
  },
  methods:{
    //用户退出
    signOut(){
      this.$store.state.userInfo = null
      this.$store.state.shopCart = null
      this.$store.state.shopCartLength = 0
      let path = window.location.origin + '/jd'
      localStorage.setItem(path,'')
      //console.log(localStorage.aaa); //undefined

      //如果后续我们在进行退出用户后。测试页面时，发现数据没有清空。则在此处添加清空数据的 对应值
    }
  }
};
</script>

<style scoped>
</style>
