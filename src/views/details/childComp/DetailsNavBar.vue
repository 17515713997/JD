<template>
  <nav-bar id="detailsNavBar" ref="detailsNavBar">
    <div slot="left" class="left" v-on:click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>
    </div>
    <el-tabs slot="center" class="tabCenter" v-model="currentIndex" @tab-click="tabCenterClick">
      <el-tab-pane
        v-for="(item,index) in title"
        v-bind:key="index"
        v-bind:label="item"
        v-bind:name="item"
      ></el-tab-pane>
    </el-tabs>
    <div slot="right" class="right">
      <!-- el-icon-more -->
      <el-dropdown trigger="click" @command="pushRouter">
        <span class="el-dropdown-link">
          <i class="el-icon-more-outline el-icon-more"></i>
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
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: "商品",
    };
  },
  components: {
    //组件
    NavBar,
  },
  methods: {
    //事件
    tabCenterClick(val) {
      console.log(val);
      var num = 0;
      if (val.constructor == Number || (val.constructor == Number) == String) {
        num = val;
        this.currentIndex = this.title[val - 1];
      } else {
        let arr = val.$el.id.split("-");
        let data = arr[arr.length - 1];
        this.currentIndex = data;
        num = 0;
        this.title.forEach((item, index) => {
          if (item == data) {
            num = index;
          }
        });
      }
      this.$refs.DetailsScroll.scroll.scrollTo(
        0,
        num == 0 ? 0 : -num * 800,
        200
      );
    },
    pushRouter(path) {
      console.log(path);
      this.$router.push(path);
    },
  },
  watch: {
    //监听
  },
};
</script>
<style lang="less">
#detailsNavBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  z-index: 100;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0);
  .left i {
    background-color: rgba(59, 59, 59, 1);
    padding: 9px;
    border-radius: 50%;
    color: #fff;
  }
  .tabCenter {
    display: none;
    opacity: 0;
    .tab-bar-center-item {
      flex: 1;
    }
    div.el-tabs__header.is-top,
    div.el-tabs__nav {
      margin: 0 !important;
      width: 100%;
      display: flex;
    }
    .el-tabs__nav-wrap {
      width: 100%;
    }
    .el-tabs__active-bar {
      width: calc(100% / 4) !important;
    }
    .el-tabs__item {
      flex: 1;
      padding: 0;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent !important;
    }
  }
  .right i {
    background-color: rgba(59, 59, 59, 1);
    padding: 9px;
    border-radius: 50%;
    color: #fff;
  }
}

.dropdown {
  top: 40px !important;
}
</style>
