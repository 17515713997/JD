<template>
  <!-- Object.keys(goodsInfo).length !== 0  用来判断对象是否有keys ,如果没值则不挂载。 -->
  <div class="goods" v-if="Object.keys(goodsInfo).length !== 0">
    <div class='info-price'>
      <div class='n-price'>{{goodsInfo.newPrice}}</div>
      <div class='o-price'>{{goodsInfo.oldPrice}}</div>
    </div>
    
    <div class='info-title'>{{goodsInfo.title}}</div>
    <div>
      巴拉巴拉：
      <span v-for="(item,index) in goodsInfo.imgList" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      goodsInfo: {
        oldPrice: "200",
        newPrice: "",
        imgList: [1, 2, 3, 4, 5],
        title: "这是一件衣服这是一件衣服这是一件衣服这是一件衣服这是一件衣服",
      },
    };
  },
  components: {
    //组件
  },
  computed: {
    //计算
  },
  created() {
    //创建
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
<style scoped>
.goods div {
  height: 200px;
  border-bottom: 5px solid red;
  margin-bottom: 10px;
}
</style>
