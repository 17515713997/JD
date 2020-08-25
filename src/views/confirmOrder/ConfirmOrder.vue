<template>
  <div id="confirmOrder">
    <scroll class="scroll">
      <nav-bar>
        <div slot="left">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">确认订单</div>
        <div slot="right"></div>
      </nav-bar>
      <div class='address'>
        <div v-if='$store.state.ShoppingAddress == null'>
          <button @click="$store.commit('ROUTERTO','/newAddr/0')">+ 请添加地址</button>
        </div> 
        <div v-else class='selectAddr' @click="$store.commit('ROUTERTO','/allAddr')">
          <h2>{{address.takeover_name}} <span>{{ address.takeover_tel | changeTel}}</span></h2>
          <p>{{address.takeover_addr}}</p>
        </div>
      </div>
      <!-- {{shop}} -->
      <div v-for="(item,index) in shop" :key="index" style="padding: 15px;">
        <div class="ordertail">
          <div class="listimg">
              <img :src="$store.state.urlPath+'/goods/'+item.img_cover" alt />
          </div>
          <div class="cardet" style="flex:5">
              <div>{{item.goods_name}}</div>
              <div class="norm-box" style="font-size:12px;">
                <p class="norm">
                  <em
                    style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
                  >{{item.goods_name}}</em>
                  <span>
                    ,选服务
                    <i class="el-icon-arrow-down"></i>
                  </span>
                </p>
              </div>

              <div class="pricenum">
                <span>￥{{item.money_now}}</span>
                <span>x{{item.num}}</span>
              </div>
            </div>
        </div>
        <div style="text-align: left;">
          <div>
              商品金额:<span>￥{{item.money_now}}</span>
          </div>
          <div>运费:0</div>
          <div>实付金额<span>￥{{item.money_now}}</span></div>
        </div>
      </div>
      <!-- <button @click="payment">确认订单-跳转支付页面-也可以打开一个模态框 进行支付</button> -->
      <el-button type="primary" style="display:block;width:100%;" @click="payment">在线支付</el-button>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { create_order } from "network/order";
export default {
  name: "ConfirmOrder",
  components: {
    //组件
    NavBar,
    Scroll,
  },
  data() {
    return {
      orderData: {
        user_id: "",
        shopcarts_id: [],
      },
    };
  },
  beforeRouteLeave (to, from, next) {
    console.log(from);
    this.$store.state.configOrderHistory = from.path
    next()
  },
  methods: {
    //事件
    payment() {
      //获取要提交的数据
      this.orderData.user_id = this.$store.state.userInfo;

      this.shop.forEach((item) => {
        this.orderData.shopcarts_id.push(item.id);
      });
      if (window.confirm("是否确认提交订单")) {
        create_order(this.orderData).then((res) => {
          if (res.code != 200) {
            //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
            this.$router.push("/profile");
            return;
          }
          //提交订单成功后。把默认的配送地址取回来。放到购物车页面
          this.$store.state.ShoppingAddress = this.$store.state.userInfo.defaddr;
          this.$router.push("/payment/" + res.data.order_id);
        });
      }
    },
  },
  computed: {
    //计算
    address(){
      return this.$store.state.ShoppingAddress
    }
  },
  created() {
    //创建
    //JSON.stringify()  // 把数组/对象类型的数据转换成JSON类型的字符串数据
    // JSON.parse() 方法把字符串数据转换成原来的类型
    if(!this.$store.state.userInfo){
      this.$store.commit('ROUTERTO','/home')
    }
    this.shop = JSON.parse(this.$route.params.shop);
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
  filters:{
    changeTel(val){
      return val.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
    }
  }
};
</script>
<style lang="less" scoped>
#confirmOrder {
  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    .address{
      border-bottom:1px solid baack;
      box-shadow: 0 1px 1px burlywood;
      margin-bottom:10px;
      padding:10px;
      .selectAddr{
        text-align: left;
        h2{
          margin-bottom:8px;
        }
      }
    }
  }
}
.ordertail {
  display: flex;
    .listimg {
       width: 86px;
       height: 86px;
       img {
          width: 100%;
          height: 100%;
      }
  }
}
.cardet {
    padding-left: 10px;
    .pricenum {
        display: flex;
        span {
          flex: 1;
          text-align: left;
          &:nth-child(2) {
            text-align: right;
          }
      }
    }
}
</style>


