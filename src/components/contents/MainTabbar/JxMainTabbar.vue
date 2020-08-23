<template>
  <tab-bar>
    <tab-bar-item v-for="item in tabBarArr" :key="item.id" :path="item.path" :cstyle="tabbarstyle">
      <img slot="item-icon" :src="$store.state.urlPath+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.urlPath+'/tabbar/'+item.aImg" />
      <div slot="item-text">{{item.name}}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// components  webpack的别名中配置的名字
import TabBar from "components/common/tabbar/TabBar";
// TabBarItem  插槽组件
import TabBarItem from "components/common/tabbar/TabBarItem";
//获取tabbar数据
import { getTabBar } from "network/tabbar";
export default {
  name: "MainTabbar",
  data() {
    return {
      tabbarstyle: {
        bgcolor: "white",
        activeBG: "white",
        color: "black",
        activeTxt: "red",
      },
      tabBarArr:[],
    };
  },
  created() {
    this.getTabBar("/jx_tabbar");
  },
  components: {
    TabBar,
    TabBarItem,
  },
  methods: {
    getTabBar(path) {
      getTabBar(path).then((res) => {
        this.tabBarArr = {...res.data};
        // console.log(this.tabBarArr);
      });
    },
  },
};
</script>

<style scoped>
</style>
