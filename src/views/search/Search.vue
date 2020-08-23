<template>
  <div class id="search">
    <nav-bar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div slot="right"></div>
    </nav-bar>
    <h1>search</h1>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Search",
  data() {
    return {};
  },
  components: {
    NavBar,
  },
  computed: {},
  created() {
    //   isTabbar
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
#search {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
}
</style>
