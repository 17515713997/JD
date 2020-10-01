<template>
  <div class="shop-cart-details" ref="shop_cart_details">
    <div class="shop_self_support">
      <div class="shop_head">
        <input class="shop_icon" type="checkbox" v-on:click="shopCheckAll" />
      </div>
    </div>
    <div class="shop_shopItem">
      <div class="shop_name">
        <input type="checkbox" v-on:click="shopCheckAll" />
        {{ shopName }}
      </div>
      <div
        v-for="(obj, index) in goods"
        :key="index"
        class="shopItem"
        :title="obj.goods_id"
      >
        <div class="radio">
          <input
            type="checkbox"
            :checked="obj.ischeck == 1"
            v-on:click="checkObj(index, obj.num, 'a')"
          />
        </div>
        <div class="shop" v-on:click="toDetails('/details/' + obj.goods_id)">
          <div class="left">
            <img
              :src="$store.state.urlPath + '/goods/' + obj.img_cover"
              alt="图片"
            />
          </div>
          <div class="right">
            <p class="title">{{ obj.goods_name }}</p>

            <div class="norm-box" v-on:click.stop="checkNorm(obj)">
              <p class="norm">
                <em>{{ obj.goods_name }}</em>
                <span>
                  , 选服务
                  <i class="el-icon-arrow-down"></i>
                </span>
              </p>
            </div>

            <p class="price">价格：{{ obj.money_now }}</p>
            <div class="num">
              <button v-on:click.stop="num(index, '-')" :disabled="jian">
                -
              </button>
              <input
                type="text"
                v-on:click.stop="num(index, 'replace')"
                :value="obj.num"
              />
              <button v-on:click.stop="num(index, '+')">+</button>
            </div>
            <p class="delegg">
              <span>移入关注 |</span>
              <span @click.stop="cartDel($event)">删除</span>
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    shopName: {
      //接收传递过来的购物车中的店铺名
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ischeck: true,
      jian: false,
    };
  },
  mounted() {
    this.isShopCheckAll();
  },
  computed: {
    name() {
      return this.shopName;
    },
    //当前页面需要用到的商品。通过传递过来的计算后的店铺名 从shopCart中获取
    goods() {
      return this.$store.state.shopCart[this.name];
    },
    shopCart() {
      return this.$store.state.shopCart;
    },
  },
  components: {
    //组件
  },
  methods: {
    cartDel(e) {
      console.log(
        e.currentTarget.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement
      );
      if (confirm("确认要删除此商品?")) {
        console.log("删除");
        // $(e.currentTarget.parentElement.parentElement.parentElement).remove();
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      } else {
        console.log("失败");
      }
    },
    toDetails(path) {
      this.$router.push(path);
    },
    checkNorm(data) {
      this.$emit("checknorm", data);
    },
    num(index, operation) {
      let e = e || event;
      console.log(e);

      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll(".radio input[type=checkbox]");
      console.log(index);
      this.goods[index].ischeck = "1";
      let temp = 1;
      if (operation == "-") {
        this.goods[index].num -= 1;
        //   //获取下一个兄弟元素   然后改变数值
        e.target.nextElementSibling.value =
          e.target.nextElementSibling.value * 1 - 1;
        // this.$store.state.totalNum -= 1 * 1;
        // this.$store.state.totalPayment -= this.goods[index].money_now * 1;
        // console.log(this.$store.state.totalPayment);
        // console.log(e.target.nextElementSibling.value);
        if (e.target.nextElementSibling.value <= 1) {
          this.jian = true;
        }
      }
      if (operation == "+") {
        this.goods[index].num += 1;
        //   //获取上一个兄弟元素
        e.target.previousElementSibling.value =
          e.target.previousElementSibling.value * 1 + 1;
        // this.$store.state.totalNum =
        //   this.$store.state.totalNum == 0
        //     ? e.target.previousElementSibling.value
        //     : this.$store.state.totalNum * 1 + 1;
        // console.log(this.$store.state.totalNum);
        // this.$store.state.totalPayment += this.goods[index].money_now * 1;
        if (e.target.previousElementSibling.value >= 1) {
          this.jian = false;
        }
      }
      // this.goods[index].ischeck = "1";
      if (operation == "replace") {
        console.log(this.$store.state.shopCart);
        let num = 0,
          money = 0;
        for (let i in this.$store.state.shopCart) {
          for (let j in this.$store.state.shopCart[i]) {
            if (this.$store.state.shopCart[i][j].ischeck == 1) {
              num += this.$store.state.shopCart[i][j].num * 1;
              money +=
                this.$store.state.shopCart[i][j].money_now *
                this.$store.state.shopCart[i][j].num *
                1;
            }
          }
        }
        console.log(num);
        console.log(money);
        this.$store.state.totalNum = num;
        this.$store.state.totalPayment = money;
      }
      // console.log(this.goods[index]);
      if (!btnAll[index].checked) {
        temp = this.goods[index].num;
        btnAll[index].checked = true;
        operation = "+";
      }
      this.checkObj(index, temp, operation);
    },
    checkObj(index, num, tempA) {
      let e = e || event;
      let temp = 1;
      if (!e.target.checked) {
        temp = -1;
      }
      if (tempA == "a") {
        //商品未选中
        this.$store.state.totalPayment +=
          this.goods[index].money_now * num * temp;
        this.$store.state.totalNum += num * temp;
        this.goods[index].ischeck = Number(e.target.checked).toString();
      } else {
        // 商品加减
        tempA == "+" ? (temp = 1) : (temp = -1);
        this.$store.state.totalPayment +=
          this.goods[index].money_now * num * temp;
        this.$store.state.totalNum += num * temp;
      }

      this.isShopCheckAll();
    },
    //判断全选是否被选中
    isShopCheckAll() {
      //获取盒子
      let box = this.$refs.shop_cart_details;
      //获取商店复选框
      let shopBtn = box.querySelector(".shop_name input[type=checkbox]");
      let btnAll = box.querySelectorAll(".radio input[type=checkbox]");
      let temp = 0;
      btnAll.forEach((obj) => {
        if (obj.checked == true) {
          temp++;
        }
      });
      if (temp == btnAll.length) {
        shopBtn.checked = true;
      } else {
        shopBtn.checked = false;
      }
      this.$emit("ischeckshopall");
      console.log(this.$emit("ischeckshopall"));
    },
    shopCheckAll() {
      let e = e || event;
      // e.target.checked; // true / false
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll(".radio input[type=checkbox]");
      let temp = -1;

      if (e.target.checked) {
        temp = 1;
      }
      console.log(e.target.checked);
      for (let i = 0; i < btnAll.length; i++) {
        //如果当前商品复选框的checked 为true  并且 店铺复选框也为 ture，则跳过当前循环。执行下一次循环
        // 因为如果当前商品是选中的状态。那么支付总价是不需要增加价钱的，所以直接跳过当前循环的后续代码执行
        if (btnAll[i].checked && e.target.checked) {
          continue;
        }
        this.$store.state.totalPayment +=
          this.goods[i].money_now * this.goods[i].num * temp;
        this.$store.state.totalNum += this.goods[i].num * temp;
        btnAll[i].checked = e.target.checked;
        this.goods[i].ischeck = Number(e.target.checked).toString();
      }
      this.$emit("ischeckshopall");
    },
    aaa(val) {
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll(".radio input[type=checkbox]");
      for (let i = 0; i < btnAll.length; i++) {
        btnAll[i].checked = val;
        this.goods[i].ischeck = Number(val).toString();
      }
    },
  },
};
</script>
<style lang='less' scoped>
@line-heigh: 20px;
.shop-cart-details {
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fff;
  .shop_self_support {
    padding: 0.6rem 0 1px;
    position: sticky;
    z-index: 99;
    background-color: #fff;
    .shop_head {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      margin-top: 0;
      margin-bottom: 0.6rem;
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 0.9rem 0 2.5rem;
      margin: 0.9rem 0;
      .shop_icon {
        position: absolute;
        top: 0;
        left: 0.9rem;
        width: 0.95rem;
        height: 100%;
        display: block;
        z-index: 1;
      }
    }
  }
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
          .num {
            width: 30%;
            margin-left: 70%;
            button {
              width: 30%;
              margin: 2px 0;
            }
            input[type="text"] {
              width: 30%;
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
}
</style>
