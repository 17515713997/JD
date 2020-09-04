<style lang="less" scoped>
</style>
<template>
  <div class="Store">
    这是店铺模板页面。还没有做修饰。
    <hr />页面需要请求接口。返回店铺数据
  </div>
</template>

<script>
export default {
  name: "Shops",
  data() {
    return {};
  },
  components: {
    //组件
  },
  computed: {},
  created() {
    let a = [
      {
        goods_id: "7",
        goods_name:
          "舌里%20蛋黄酥12枚装雪媚娘饼干蛋糕早餐代餐网红面包休闲零食小吃500g/箱",
        money_now: "19.9",
        money_old: "25",
        norm: "{}",
        num: 1,
        shop_id: 8,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
      {
        goods_id: "21",
        goods_name:
          "南极人女鞋夏季气垫鞋休闲鞋女士飞织透气女时尚学生板鞋运动跑步鞋韩版百搭潮鞋网鞋镂空",
        money_now: "73",
        money_old: "80",
        norm: "{}",
        num: 1,
        shop_id: 4,
        takeover_addr: "北京市,北京市,昌平区,",
        user_id: 14,
      },
    ];
    console.log(a);
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
  methods: {},
  watch: {
    //监听
  },
};
</script>
