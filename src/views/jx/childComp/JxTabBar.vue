<template>
  <tab-bar>
    <tab-bar-item v-for="item in tabBarArr" :key='item.id' :path="item.path" :cstyle='tabbarstyle'>
      <img slot="item-icon" :src="$store.state.path+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.path+'/tabbar/'+item.aImg" />
      <div slot="item-text">{{item.name}}</div>
    </tab-bar-item>
    <!-- <tab-bar-item path="/home" >
      <img slot="item-icon" src="~/assets/img/tabbar/home.svg" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/home_active.svg" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~/assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/category_active.svg" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/jx" >
      <img slot="item-icon" src="~/assets/img/tabbar/shopcart.svg" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/shopcart_active.svg" />
      <div slot="item-text">惊喜</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" >
      <img slot="item-icon" src="~/assets/img/tabbar/shopcart.svg" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/shopcart_active.svg" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" >
      <img slot="item-icon" src="~/assets/img/tabbar/profile.svg" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/profile_active.svg" />
      <div slot="item-text">我的</div>
    </tab-bar-item> -->
  </tab-bar>
</template>

<script>
// components  webpack的别名中配置的名字
import TabBar from "components/common/tabbar/TabBar";
// TabBarItem  插槽组件
import TabBarItem from "components/common/tabbar/TabBarItem";
//获取tabbar数据
import {getTabBar} from 'network/tabbar'
export default {
  name: "JxTabBar",
  data() {
    return {
      tabbarstyle: {
        bgcolor: "white",
        activeBG: "white",
        color: "black",
        activeTxt: "red"
      },
      tabBarArr: []
    };
  },
  created() {
    console.log(this.$store.state.path)
    this.getTabBar('/jx_tabbar');
  },
  components: {
    TabBar,
    TabBarItem
  },
  methods: {
    getTabBar(path) {
      // return 
      getTabBar(path).then(res=>{
        console.log(res);
        this.tabBarArr = [...res.data]
      })
    }
  }
};
</script>

<style scoped>
</style>
