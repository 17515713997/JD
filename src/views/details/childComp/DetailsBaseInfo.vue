<style lang='less' scoped>
.goods {
  background-color:#fff;
  >div{
    // border-bottom: 5px solid red;
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="goods" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-price">
      <div class="n-price">{{goodsInfo.newPrice}}</div>
      <div class="o-price">{{goodsInfo.oldPrice}}</div>
    </div>

    <div class="info-title">{{goodsInfo.title}}</div>
    <div>
      巴拉巴拉：
      <span v-for="(item,index) in goodsInfo.imgList" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  components: {
    //组件
  },
  computed: {
    //计算
  },
  created() {
    //创建
    console.log(this.goodsInfo);
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  mounted() {
    //渲染
  },
  methods: {
    //事件
  },
  watch: {
    //监听
  },
};
</script>

