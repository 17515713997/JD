<template>
  <tab-bar class="tabbar">
    <tab-bar-item
      v-for="item in tabBarArr"
      :key="item.id"
      :path="item.path"
      :cstyle="tabbarstyle"
      class="item"
    >
      <img slot="item-icon" :src="$store.state.urlPath+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="$store.state.urlPath+'/tabbar/'+item.activeImg" />
      <div slot="item-text">
        {{item.title}}
        <i v-if="item.path =='/cart'">{{shopCartLength}}</i>
      </div>
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
      tabBarArr: [],
    };
  },
  created() {
    this.getTabBar();
  },
  computed: {
    shopCartLength() {
      return this.$store.state.shopCartLength;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  components: {
    TabBar,
    TabBarItem,
  },
  methods: {
    getTabBar(path = "/jd_tabbar") {
      getTabBar(path).then((res) => {
        this.tabBarArr = [...res.data];
      });
    },
  },
};
</script>

<style lang='less' scoped>
.tabbar .item {
  position: relative;
  div i {
    position: absolute;
    right: 0px;
    bottom: 30px;
    display: block;
    width: 24px;
    height: 16px;
    background-color: #fff;
    border: 1px solid red;
    color: red;
    font-style: normal;
    text-align: center;
    line-height: 16px;
    border-radius: 8px;
    font-size: 10px;
  }
}
</style>
