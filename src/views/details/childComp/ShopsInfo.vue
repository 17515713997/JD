<style lang="less" scoped>
#shopsinfo {
  margin-top: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  .head {
    text-align: left;
    line-height: 40px;
    position: relative;
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
      position:absolute;
      top:14px;
      right:0;
      font-size:12px;
      line-height:12px;
      border-radius: 8px;
      padding:3px 6px;
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
    border-radius: 4px;
    outline:none;
    border:none;
  }
  button.active{
    background-color:red;
    color:#fff;
  }
}
</style>
<template>
  <div id="shopsinfo" v-if="!show">
    <div class="head">
      <img :src="shopsinfo.shopLogo" alt="《店铺商标》" />
      <span title="标题" class="title">{{shopsinfo.shopName?shopsinfo.shopName:"没有店铺名字"}}</span>
      <span class='cartgory' v-if="shopsinfo.category == '个体'">
        <!-- {{shopsinfo.caregory == '自营'? "自营":""}} -->
        {{shopsinfo.category}}
      </span>
    </div>
    <div class='other'>
      <span>
        {{shopsinfo.collection}}
        <br />粉丝数量
      </span>
      <span>
        {{shopsinfo.cGoods}}
        <br />全部商品
      </span>
    </div>
    <div>
      <button @click="collectionStore" :class='{active:collectionAcive}'>收藏店铺</button>
      <button @click="toStore(shopsinfo.shopsId)">进入店铺</button>
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
    return {
      //collectionAcive:false,计算取值，看用户的收藏中是否能查到该值
    };
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
      )
    },
    //此处的数据需要修改
    collectionAcive(){
      //假设user的收藏数据  [1,2,444,666,888]  数组内是用户收藏的店铺编号
      // let  arr  =  this.$store.state.userInfo.['收藏的店铺key']
      let arr = [1,2,444,666,888]
      // Object.keys(对象)    返回一个数组，数组的值是对象的key的集合
      if(Object.keys(this.shopsinfo).length > 0){
        return arr.indexOf(this.shopsinfo.shopsId) != -1 ? true : false
      } 
      return false
    }
  },
  methods: {
    //收藏店铺
    collectionStore() {
      //判断当前收藏状态, 0 还是 1
      //请求数据库,修改用户收藏数据
      if(this.$store.state.userInfo){
        //有用户，请求数据库，添加用户收藏
        this.collectionAcive = !this.collectionAcive
        if(this.collectionAcive){ //true
          //收藏   为用户添加收藏数据
        }else{//false
          // 取消收藏
        }
      }else{
        //跳转页面 登陆页面
        //登录后   再去执行当前的方法
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
