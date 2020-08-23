<template>
  <div class="GoodsList">
      <goods-list-item v-for="(item,key) in cgoods" :key="key" :citem="item" :itemPath="path" :isDirection ='cisDirection' :bus="bus"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    cgoods: {//home页面的goods[xxxx].list 是一个数组
      type: Array,
      default() {
        return [];
      }
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image"
    },
    tabCurrentType: {
      type: String,
      default: "recommend"
    },
    cisDirection:{
        type:Boolean,
        dufault:true
    },
    bus:{
      type:String,
      default:''
    }
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem
  },
};
</script>
<style scoped>
.GoodsList {
    display:flex;
    flex-wrap: wrap;
}
</style>
