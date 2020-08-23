<template>
  <div class="confirmrder">
    <!-- 注意问题：在确认订单页面时可以更改商品数量的
    如果有修改数据，记得去找修改购物车数据接口去修改-->
    <scroll ref="confimscroll" class="confimscroll">
      <nav-bar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">确认订单</div>
      </nav-bar>

      <div class="shopnamemess" v-if="$store.state.userinfo==null">
        <div>
          <!-- <button>请添加地址</button> -->
          <div>
            <p>王金帅</p>
            <p>175****3997</p>
            <p>山东菏泽曹县</p>
          </div>
        </div>
        <div class="el-icon-arrow-right" style="flex:1;line-height:68px;"></div>
        <div class="p">
          <p></p>
        </div>
      </div>
      <div class="shopnamemess" @click="goaddress" v-else>
        <div>
          <strong>21345 3456789</strong>
          <p>{{$store.state.userinfo}}</p>
        </div>
        <div class="el-icon-arrow-right" style="flex:1;line-height:68px;"></div>
        <div class="p">
          <p></p>
        </div>
      </div>

      <div class="shoplist" v-for="(item,key,index) in shop1" :key="index">
        <div>{{key}}</div>
        <div v-for="(list,index) in item" :key="index" class="bottomdet">
          <div class="ordertail">
            <div class="listimg">
              <img :src="$store.state.urlPath+'/goods/'+list.img_cover" alt />
            </div>
            <div class="cardet" style="flex:5">
              <div>{{list.goods_name}}</div>
              <div class="norm-box" style="font-size:12px;">
                <p class="norm">
                  <em
                    style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
                  >{{list.goods_name}}</em>
                  <span>
                    ,选服务
                    <i class="el-icon-arrow-down"></i>
                  </span>
                </p>
              </div>

              <div class="pricenum">
                <span>￥{{list.money_now}}</span>
                <span>x{{list.num}}</span>
              </div>
            </div>
          </div>
        <div class="box3">
          <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">配置</span>
          <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:#ccc">快速运输</span>
        </div>
       <div class="box4">
        <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">退还无忧</span>
        <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:red">商家赠送</span>
      </div>
       <div class="box5" style="border:none">
        <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">店铺备注</span>
        <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:#ccc">商品留言</span>
      </div>
        </div>
      </div>

      <div class="emlis">
      <div class="emlis1">
        <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">发票信息</span>
        <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:#ccc">个人不开发票</span>
      </div>
      <div class="emlis2">
        <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">礼品卡</span>
        <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:#ccc">无可用</span>
      </div>
      <div class="emlis3" style="border:none">
        <span style="float:left;display: block;width:40%;text-align:left;padding-left: 10px;">红包</span>
        <span style="float:right;display: block;width:50%;text-align:right;font-size:12px;color:#ccc">无可用</span>
      </div>
    </div>
      <div class="msgorder2">
        <div>
           商品金额
        </div>
        <div>运费</div>
        <div>实付金额</div>
        <div style="margin:10px">
          <el-button
            type="primary"
            @click="dialogVisible = true"
            plain
            style="display:block;width:100%;margin-bottom:10px;"
          >货到付款</el-button>

          <el-dialog
            :visible.sync="dialogVisible"
            width="88%"
            top="34vh"
            :modal="false"
            :show-close="false"
          >
            <img
              style="display: block;
    width: 50px;
    height: 50px;
    margin: 5px auto 10px;"
            />
            <span>是否确认使用货到付款提交订单</span>
            <div>货到付款订单总价</div>
            <div>含货到付款运费：免运费</div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

          <el-button type="primary" style="display:block;width:100%;" @click="confirm_order">在线支付</el-button>
        </div>

        <img
          alt
          style="display: block;
    width: 100px;
    height: 20px;
    margin: 20px auto 40px auto;"
        />

        <!-- <div>此订单不支持以下支付方式</div> -->
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { create_order } from "network/order";
export default {
  name: "confirmrder",
  data() {
    return {
      orderData: {
        user_id: "",
        shopcarts_id: [],
      },
      dialogVisible: false,
      shop: [],
      shop1: {},
      money: 0,
    };
  },
  components: {
    NavBar,
    Scroll,
  },
  created() {
    this.shop = JSON.parse(this.$route.params.shop);
    console.log(this.shop);
    this.get_shop();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    goaddress() {
      this.$router.push("/address");
    },
    confirm_order() {
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
          this.$router.push("/payment/" + res.data.order_id);
        });
      }
    },
    get_shop() {
      var arr = {},
        arrname = [];
      console.log(this.shop);
      // 逐条去处购物车页面的商品数据
      this.shop.forEach((item) => {
        // this.money+=item.money_now*item.num
        let yy = arrname.indexOf(item.shop_name);
        if (yy != -1) {
          arr[item.shop_name].push(item);
        } else {
          arrname.push(item.name);
          arr[item.shop_name] = [];
          arr[item.shop_name].push(item);
        }
      });
      this.shop1 = arr;
      console.log(this.shop1)
    },
  },
};
</script>
<style lang='less'>
.confirmrder {
  background: #ccc;
  .content {
    > div {
      background: white;
    }
    > div:not(:first-child) {
      margin-bottom: 10px;
    }
    .shopnamemess {
      position: relative;
      display: flex;

      flex-wrap: wrap;
      border-top: 1px solid #ddd;
      > div:first-child {
        flex: 7;
        text-align: left;
        padding-top: 14px;
        p {
          margin-top: 8px;
          margin-bottom: 0px;
        }
      }
      > div:not(:last-child) {
        padding-left: 10px;
      }
    }
    .shoplist {
      // margin-bottom: 10px;
      > div {
        padding: 0 10px;
        &:first-child {
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
      }
      .bottomdet {
        > div {
          border-bottom: 1px solid #ddd;
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
      }
    }
    .msgorder {
      padding: 0 10px;
      > div {
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
    }
    .msgorder2 {
      margin-bottom: 0 !important;
      > div {
        &:not(:last-child) {
          text-align: left;
          padding: 0 10px;
        }
        &:last-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }
    .el-button + .el-button {
      margin-left: 0;
      margin-top: 10px;
    }
    .p {
      width: 100%;
      p {
        // background: url("../../assets/img/orderxt.png") -7px bottom repeat-x;
        height: 10px;
        margin: 0;
        // margin-left:-4px;
        background-size: 65px 4px;
      }
    }
  }
}
.confimscroll {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  float: left;
}
.el-dialog__header {
  padding: 0;
}
.dialog-footer .el-button {
  width: 48%;
  border-radius: 20px;
  &:first-child {
    margin-right: 3%;
  }
}
.order .content_box .box3,
.order .content_box .box4,
.order .content_box .box5{
  padding-left:10px;
  float:left;
  width:374px;
  padding:10px 0 ;
  border-bottom: 1px solid #ccc;
}
.order .emlis{
  background: #fff;
  margin-top:15px;
  border-radius: 10px;
  float:left;
  width:100%;
}
.order .emlis .emlis1,
.order .emlis .emlis2,
.order .emlis .emlis3{
  padding-left:10px;
  float:left;
  width:374px;
  padding:10px 0 ;
  border-bottom: 1px solid #ccc;
}
</style>
