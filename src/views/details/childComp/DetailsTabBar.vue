<template>
  <div id="DetailsTabBar">
    <tab-bar class='bar'>
        <tab-bar-item>
            <img slot="item-icon" src="" />
            <div slot="item-text">客服</div>
        </tab-bar-item>
        <tab-bar-item>
            <img slot="item-icon" src="" />
            <div slot="item-text">店铺</div>
        </tab-bar-item>
        <tab-bar-item path='/cart'>
            <img slot="item-icon" src="" />
            <div slot="item-text" class='cart'>
              购物车
              <i>{{shopCartLength}}</i>
            </div>
        </tab-bar-item>
    </tab-bar>
    <div class='btnAll'>
      <button v-on:click="shopcart">
        <span>加入购物车</span>
      </button> 
      <button class='payload' v-on:click="toOrder">
        <span >立即购买</span>
      </button >
    </div>
  </div>
</template>

<script>
import TabBar  from 'components/common/tabbar/TabBar'
import TabBarItem  from 'components/common/tabbar/TabBarItem'
export default {
  name: "DetailsTabBar",
  data() {
    return {};
  },
  components: {
    //组件
    TabBar,
    TabBarItem
  },
  computed: {
    //计算
    shopCartLength(){
      return this.$store.state.shopCartLength
    },
    userInfo(){
      return this.$store.state.userInfo== null? null:this.$store.state.userInfo.id
    },
    user(){
      return this.userInfo!= "" && this.userInfo != null && this.userInfo != undefined
    }
  },
  created() {
    //创建
    // console.log(this.$store.getters.shopCartLength)
    if ( this.user && this.shopCartLength == 0) {
      // this.getShopCart();
      this.$store.dispatch("getShopCart", this.userInfo);
    }
  },
  methods: {
    //事件
    shopcart(){
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      // console.log(this.$parent.addShop);
      this.$parent.addShop();

      //出错？啥子问题。。。
      //this.$emit('addshopcart')
    },
    toOrder(){
      this.$parent.addOrder(1);
    }
  },
};
</script>
<style lang='less' scoped>
#DetailsTabBar{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    height:49px;
    background-color:#fff;
    box-shadow: 0 -1px 1 #dedede;
    display: flex;
    padding-top:10px;
    div.bar{
        position:static;
        min-width: 45vw;
        display: flex;
        div{
          position:relative;
          i{
            position: absolute;
            right:0;
            bottom:35px;
            display: block;
            width:22px;
            height:22px;
            border-radius:50%;
            line-height: 22px;
            text-align: center;
            color:#fff;
            background-color: red;
            font-style:normal;
          }
        }
    }
    div.btnAll{
        max-width:55vw;
        min-width: 30vw;
        flex:1;
        display: flex;
        button{
            flex:1;
            margin:0 3px;
            height:40px;
            border-radius:20px;
            font-size:14px;
            padding:0 13px;
            color:#fff;
            background:red;
            outline: none;
            border:none;
            span{
                display: block;
                min-width: 14px;
                overflow: hidden;
                height:14px;
            }
        }
        button.payload{
            background:pink;
            color:#000;
        }
    }
}
</style>
