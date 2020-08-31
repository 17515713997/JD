<style lang="less" scoped>
#shopsinfo {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top:10px;
  .head {
    text-align: left;
    line-height: 40px;
    img{
      color:red;
      margin-right:10px;
    }
    span.title{
      border:1px solid black;
      font-weight: bold;
      padding:5px;
    }
    span.cartgory{
      background-color:red;
      color:#fff;
    }
  }
  .other{
    display: flex;
    margin:20px 0;
    span{
      flex: 1;
    }
  }
  button {
    width: 30%;
    height: 40px;
    margin: 10px 5px;
  }
}
</style>
<template>
  <div id="shopsinfo" v-if="!show">
    <div class="head">
      <img :src="shopsinfo.shopLogo" alt="《店铺商标》" />
      <span title="标题" class="title">{{shopsinfo.shopName?shopsinfo.shopName:"没有店铺名字"}}</span>
      <span class='cartgory'>{{shopsinfo.caregory == '自营'? "自营":""}}</span>
    </div>
    <div class='other'>
      <span>
        {{"0"}}
        <br />粉丝数量
      </span>
      <span>
        {{shopsinfo.cGoods}}
        <br />全部商品
      </span>
    </div>
    <div>
      <button @click="collectionStore">收藏店铺</button>
      <button @click="toStore(shopsinfo.shopId)">进入店铺</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopsinfo",
  props: {
    shopsinfo: {
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
    show() {
      // console.log(this.shopsinfo);
      // console.log(this.shopsinfo != undefined);
      // console.log(this.shopsinfo != {});
      // console.log(this.shopsinfo != null);
      return (
        this.shopsinfo == undefined ||
        this.shopsinfo == {} ||
        this.shopsinfo == null
      );
    },
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
    //收藏店铺
    collectionStore() {
      console.log("收藏店铺");
      //判断当前收藏状态, 0 还是 1
      //请求数据库,修改用户收藏数据
      if(this.$store.state.userInfo){
        //有用户，请求数据库，添加用户收藏
        
      }else{
        //跳转页面
      }
    },
    //进入店铺
    toStore(path) {
      console.log("进入店铺",path);
      this.$store.commit("ROUTERTO",'/shops/'+path)
      //跳转页面，进入店铺页面。后调用数据库，请求店铺数据
    },
  },
  watch: {
    //监听
  },
};
</script>
