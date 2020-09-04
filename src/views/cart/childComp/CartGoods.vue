<template>
  <div class="shop-cart-details" ref="shop_cart_details">
    <div class="shop_shopItem">
      <div class="shop_name">
        <input type="checkbox" v-on:click='shopCheckAll'/>
        {{shopName}}
      </div>
      <div v-for="(obj,index) in goods" :key="index" class="shopItem" :title="obj.goods_id">
        <div class="radio">
          <input type="checkbox" :checked="obj.ischeck == 1" v-on:click='checkObj(index)'/>
        </div>
        <div class="shop" v-on:click="toDetails('/details/'+obj.  goods_id)">
          <div class="left">
            <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />
          </div>
          <div class="right">
            <p class="title">{{obj.goods_name}}</p>

            <div class="norm-box" v-on:click.stop='checkNorm(obj)'>
              <p class="norm">
                <em>{{obj.goods_name}}</em>
                <span>
                  , 选服务
                  <i class="el-icon-arrow-down"></i>
                </span>
              </p>
            </div>

            <p class="price">价格：{{obj.money_now}}</p>
            <div class='num'>
              <button v-on:click.stop ="num(index,'-')">-</button>
              <input type="text" v-on:click.stop :value='obj.num'>
              <button v-on:click.stop ="num(index,'+')">+</button>
            </div>
            <br />
          </div> 
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    shopName: {//接收传递过来的购物车中的店铺名
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ischeck: true,
    }
  },
  mounted(){
    this.isShopCheckAll()
  },
  computed: {
    name() {
      return this.shopName;
    },
    //当前页面需要用到的商品。通过传递过来的计算后的店铺名 从shopCart中获取
    goods() {
      return this.$store.state.shopCart[this.name];
    },
    shopCart(){
      return this.$store.state.shopCart
    }
  },
  components: {
    //组件
  },
  methods: {
    toDetails(path){
      this.$router.push(path);
    },
    checkNorm(data){
      this.$emit('checknorm',data)
    },
    num(index,operation){
      let e = e || event;
      if(operation == '-'){
        this.goods[index].num -= 1
      //   //获取下一个兄弟元素   然后改变数值
        e.target.nextElementSibling.value= e.target.nextElementSibling.value *1 - 1;
      }
      if(operation == '+'){
        this.goods[index].num += 1
      //   //获取上一个兄弟元素
        e.target.previousElementSibling.value= e.target.previousElementSibling.value * 1 + 1;
      }
      // console.log(this.goods[index]);
      console.log(this.$store.state.shopCart);
    },
    checkObj(index){
      let e = e || event;
      let temp = 1;
      if(!e.target.checked){
        temp = -1;
      }
      this.$store.state.totalPayment += this.goods[index].money_now * this.goods[index].num * temp
      this.$store.state.totalNum += this.goods[index].num * temp
      this.goods[index].ischeck = Number(e.target.checked).toString()
      this.isShopCheckAll()
    },
    //判断全选是否被选中
    isShopCheckAll(){
      //获取盒子
      let box = this.$refs.shop_cart_details;
      //获取商店复选框
      let shopBtn = box.querySelector('.shop_name input[type=checkbox]')
      let btnAll = box.querySelectorAll('.radio input[type=checkbox]');
      let temp = 0;
      btnAll.forEach(obj=>{ 
        if(obj.checked == true){
          temp++;
        }
      })
      if(temp == btnAll.length){
        shopBtn.checked = true;
      }else{
        shopBtn.checked = false;
      }
      this.$emit('ischeckshopall')

    },
    shopCheckAll(){
      let e = e || event;
      // e.target.checked; // true / false
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll('.radio input[type=checkbox]');
      let temp = -1;
      if(e.target.checked){
        temp = 1;
      }
      for(let i = 0 ; i < btnAll.length ; i++){
        //如果当前商品复选框的checked 为true  并且 店铺复选框也为 ture，则跳过当前循环。执行下一次循环
        // 因为如果当前商品是选中的状态。那么支付总价是不需要增加价钱的，所以直接跳过当前循环的后续代码执行
        if(btnAll[i].checked && e.target.checked){
          continue
        }
        this.$store.state.totalPayment += this.goods[i].money_now * this.goods[i].num * temp
        this.$store.state.totalNum += this.goods[i].num * temp
        btnAll[i].checked =e.target.checked
        this.goods[i].ischeck = Number(e.target.checked).toString()
      }
      this.$emit('ischeckshopall')
    },
    aaa(val){
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll('.radio input[type=checkbox]');
      for(let i = 0 ; i < btnAll.length ; i++){
        btnAll[i].checked =val
        this.goods[i].ischeck = Number(val).toString()
      }
    }
  },
};
</script>
<style lang='less' scoped>
@line-heigh: 20px;
.shop-cart-details {
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fff;
  div.shop_shopItem {
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 5px;
    margin: 0 15px;
    .shopItem {
      display: flex;
      margin-bottom: 20px;
      .shop_name {
        font-size: 20px;
        font-weight: bold;
        input {
          width: 20px;
          height: 20px;
        }
      }
      .radio {
        align-items: center;
        display: flex;
        width: 20px;
        justify-content: center;
        margin-right: 10px;
        input {
          width: 18px;
          height: 18px;
          border-radius: 50%;
        }
      }
      .shop {
        display: flex;
        flex: 1;
        .left {
          flex: 2.5;
          overflow: hidden;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .right {
          line-height: @line-heigh;
          padding: 0 15px;
          flex: 7;
          text-align: left;
          .title {
            // height: @line-heigh * 2;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
            -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
            -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
            margin-bottom: 10px;
          }
          .norm-box {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 10px;
            .norm {
              border-radius: 20px;
              padding: 3px 10px;
              background-color: #f2f2f2;
              display: flex;
              max-width: 100%;
              width: auto;
              vertical-align: middle;
              em {
                display: inline-block;
                max-width: 60%;
                font-style: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              span {
                min-width: 74px;
                margin-left: 5px;
              }
            }
          }
          .num{
            width:30%;
            margin-left:70%;
            button{
              width:30%;
              margin:2px 0;
            }
            input[type=text]{
              width:30%;
              text-align: center;
            }
          }
        }
      }
    }
  }
  div.shop_name {
    text-align: left;
    line-height: 30px;
    input {
      margin-right: 20px;
    }
  }
  // dd {
  //   img {
  //     width: 35%;
  //     height: inherit;
  //   }
  //   p.title {
  //   }
  //   p.price {
  //     color: red;
  //   }
  // }
}
</style>
