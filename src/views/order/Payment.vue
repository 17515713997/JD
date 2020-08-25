<template>
  <div class="pay">
    <navbar>
      <div slot="left">
        <!-- <i></i> -->
        <el-button type="text" class="el-icon-arrow-left" @click="dialogVisible = true"></el-button>

        <el-dialog
          title="确认要离开收银台？"
          :visible.sync="dialogVisible"
          width="99%"
          :show-close="false"
          top="33vh"
        >
          <span>你的订单将在23小时59分内未支付将被取消，请尽快完成支付</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">继续支付</el-button>
            <el-button type="primary" @click="paygo">确认离开</el-button>
          </span>
        </el-dialog>
      </div>
      <div slot="center" class="tab-center">京东收银台</div>
      <div slot="right">
        <el-dropdown trigger="click" @command="pushrouper">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home">首页</el-dropdown-item>
            <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/search">我的京东</el-dropdown-item>
            <el-dropdown-item command="/profile">浏览记录</el-dropdown-item>
            <el-dropdown-item command="/home">我的关注</el-dropdown-item>
            <el-dropdown-item command="/home">分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </navbar>
    <div style="border-top:1px solid #ddd;line-height:50px;" v-for="(item,index) in goods" :key="index"> 
      {{item.money_now}}
    </div>
    <scroll ref="payscroll" class="payscroll">
      <div class="p" style="border-top-left-radius:10px;border-top-right-radius:10px;">
        <div></div>
      </div>
      <div style="text-align:left;" class="catepay">
        <div>
          <img
            src="../../assets/imgg/pay2.png"
            style="width: 24px;height: 24px;margin-right:8px;"
            alt
          />
          <span style="flex:5;">打白条</span>
          <el-radio v-model="radio" label="开通白条并支付"></el-radio>
        </div>
        <div>
          <img
            src="../../assets/imgg/pay3.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <span style="flex:5;">使用新卡支付</span>
          <el-radio v-model="radio" label="使用新卡支付"></el-radio>
        </div>

        <div>
          <img
            src="../../assets/imgg/pay4.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <div
            style="flex:5;display:flex;margin-right:-18px;flex-wrap:wrap;border-bottom:1px solid #ddd;"
          >
            <span style="flex:5">
              <div>京东小金库</div>
              <div style="padding-bottom:8px;">请设置数字支付密码后使用</div>
            </span>
            <el-radio v-model="radio" label style="margin-right:18px;"></el-radio>
          </div>
        </div>

        <div>
          <div style="flex:1"></div>
          <span style="flex:5">全部付款方式</span>
          <el-button type="text" @click="dialogVisible1 = true">
            查看
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <el-dialog title="付款方式" :visible.sync="dialogVisible1" width="100%">
            <div>
              <div>
                <img
                  src="../../assets/imgg/pay2.png"
                  style="width: 24px;height: 24px;margin-right:8px;"
                  alt
                />
                <span style="flex:5;">打白条</span>
                <el-radio v-model="radio" label="开通白条并支付"></el-radio>
              </div>

              <div>
                <img
                  src="../../assets/imgg/pay3.png"
                  style="width: 24px;
    height: 24px;margin-right:8px;"
                  alt
                />
                <span style="flex:5;">使用新卡支付</span>
                <el-radio v-model="radio" label="使用新卡支付"></el-radio>
              </div>


              <div>
          <img
            src="../../assets/imgg/pay4.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <div
            style="flex:5;display:flex;margin-right:-18px;flex-wrap:wrap;border-bottom:1px solid #ddd;"
          >
            <span style="flex:5">
              <div>京东小金库</div>
              <div style="padding-bottom:8px;">请设置数字支付密码后使用</div>
            </span>
            <el-radio v-model="radio" label style="margin-right:18px;"></el-radio>
          </div>
        </div>



            </div>
          </el-dialog>
        </div>

        <div>
          <img
            src="../../assets/imgg/wchat.png"
            style="width: 24px;
    height: 24px;margin-right:8px;float:left;background-size:100%;"
            alt
          />
          <span style="flex:5">
            <div>微信支付方式</div>
            <div style="padding-bottom:8px;">仅安装微信6.0.2及以上版本客户端使用</div>
          </span>
          <el-radio v-model="radio" label="微信支付"></el-radio>
          <!-- </div> -->
        </div>
      </div>
    </scroll>
    <div class="paybar">
      <el-button type="danger" round style="width:90%;margin-top:10px;" @click="paygo" v-for="(item,index) in goods" :key="index">{{radio}}￥{{item.money_now}}</el-button>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";
import scroll from "components/contents/scroll/Scroll";
import { getOrderbyOrderId } from "network/order";
export default {
  name: "pay",
  data() {
    return {
      goods: {},
      order_id: null,
      moneyall: 0,
      radio: "开通白条并支付",
      dialogVisible: false,
      dialogVisible1: false,
    };
  },
  components: {
    navbar,
    scroll,
  },
  // created() {
  //   this.order_id = this.$route.params.orderid;
  //   this.getpathmentorder();
  // },
   created() {
    //创建
    this.order_id = this.$route.params.order_id;
    console.log(this.$route);
    console.log(this.order_id);
    this.getPayMentOrder();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    // getpathmentorder() {
    //   getOrderbyOrderId(this.order_id).then((res) => {
    //     // console.log(this.order_id)
    //     if (res.code != 200) {
    //       // 弹出对话框---获取订单数据失败
    //       // 跳转页面
    //       // this.$router.push('/profile')
    //     }
    //     this.goods = res.data;
    //     console.log(this.goods)
    //     this.goods.forEach((item) => {
    //       this.moneyall += item.money_now * item.num;
    //     });
    //     console.log(res.data);
    //   });
    // }
    getPayMentOrder() {
      getOrderbyOrderId(this.order_id).then((res) => {
        console.log(res);
        if (res.code != 200) {
          //弹出对话框-----获取订单数据失败
          //跳转页面 ----我的
          this.$router.push("/profile");
          return
        }
        this.goods = res.data;
      });
    },
    paygo() {
      this.dialogVisible = false;
      // this.$router.push("/zf");
      alert("待支付")
    },
    pushrouper(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang='less'>
.pay {
  .catepay {
    font-size: 14px;
    text-align: left;
    padding: 0 18px;
    > div {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .p {
    width: 100%;
    background: linear-gradient(90deg, #fef5f4 0, #fef0ef 100%);
    div {
      background: url("../../assets/imgg/pay1.png") no-repeat;
      height: 61px;
      margin: 0;
      background-size: 95px 24px;
      background-position: 18px center;
    }
  }

  .paybar {
    position: fixed;
    bottom: 0;
    height: 60px;
    background: white;
    width: 100%;
  }
}
.el-radio__label {
  display: none;
}
.el-radio__input.is-checked .el-radio__inner {
  border: none;
  background: red;
}
.el-radio__inner {
  width: 20px;
  height: 20px;
  &:after {
    width: 0;
    height: 0;
    left: 10%;
    top: 0;
    color: white;
    font-size: 20px;

    content: "√";
  }
}
.el-icon-arrow-left.el-button--text {
  width: 100%;
  color: black;
}
.el-dialog {
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.el-dialog__body {
  padding: 0 30px;
  text-align: left;
}
.el-dialog__footer {
  padding: 0;
  button {
    width: 50%;
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom: none;
    &:nth-child(1) {
      border-bottom-right-radius: 0px;
    }
  }
  .el-button + .el-button {
    margin-left: 0;
    border-bottom-left-radius: 0px;
  }
}
</style>
