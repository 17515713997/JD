<template>
  <div class="GoodsList">
    <div v-for="(item,key) in cgoods" :key="key">
      <div v-if="tabCurrentType == key">
        <div v-for="(i,j) in item.list" :key="j">
          <goods-list-item :citem="i" :itemPath="path"></goods-list-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem1";
export default {
  name: "GoodsList",
  props: {
    cgoods: {
      type: Object,
      default() {
        return {};
      }
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image"
    },
    tabCurrentType: {
      type: String,
      default: "recommend"
    }
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
