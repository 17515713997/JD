<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录，所以在使用过的时候，会出现数据不进行替换。 
      正常使用中，如果不使用keep-alive,组件在离开的时候会被销毁
    -->
    <keep-alive :include="$store.state.keepInclude">
      <router-view />
    </keep-alive>
    <jd-main-tab-bar v-if="is_jd_tabbar"></jd-main-tab-bar>
    <jx-main-tab-bar v-if="is_jx_tabbar"></jx-main-tab-bar>
  </div>
</template>

<script>
import JdMainTabBar from "components/contents/MainTabbar/JdMainTabbar";
import JxMainTabBar from "components/contents/MainTabbar/JxMainTabbar";
import { requestIp } from "network/request";
export default {
  name: "app",
  components: {
    JdMainTabBar,
    JxMainTabBar,
  },
  created() {
    console.log(this.user);
    requestIp().then((res) => { //把地址获取拿到了app页面，因为其他页面加载也都是加载到app页面。
      //如果没有用户登录，则配送地址为获取的地址
      if(!res) return 
      if (!this.user) {
        this.$store.state.ShoppingAddress = eval(
          "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
        ).cname;
      }
      //默认城市为获取的地址
      this.$store.state.city = eval(
          "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
        ).cname;
    });
    // this.$store.commit('aaa')
  },
  computed: {
    //计算
    is_jd_tabbar() {
      return this.$store.state.TabBar.is_jd_TabBar;
    },
    is_jx_tabbar() {
      return this.$store.state.TabBar.is_jx_TabBar;
    },
    userInfo(){
      return this.$store.state.userInfo != null ? this.$store.state.userInfo.id : null
    },
    user() {
      return ( this.userInfo != "" &&this.userInfo != null && this.userInfo != undefined );
    },
  },
  watch: {
    // is_jd_tabbar(newVal, oldVal) {
    //   console.log(newVal, oldVal);
    // },
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  height: 100vh;
}
</style>
