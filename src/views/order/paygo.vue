<style   lang="less" >
.paygo{
    background: #f7f7f7;
    height:1000px;
    .paygo_top{
    border-bottom: 1px solid #ccc;
    background: #fff;
    }
    .paygo_bottom{
        border-bottom:1px solid #ccc;
        padding-bottom:10px;
        background: #fff;
        input{
            background: #f7f7f7;
            border: 1px solid #ccc;
            width: 400px;
            height: 30px;
            margin-top: 10px;
            border-radius: 20px;
            padding-left: 10px;
            outline: none;
        }  
    }
}
.el-tabs__nav{
    width:100%;
    .el-tabs__item{
        width:25%;
    }
}
</style>
<template>
    <div class='paygo' v-if=aa>
        <div class='paygo_top'>
            <nav-bar class="home-nav-bar">
                <div slot="left" @click="back">&lt;</div>
                <div slot="center">
                    我的订单
                </div>
                <div slot="right">...</div>
            </nav-bar>
        </div>
        <div class="paygo_bottom">
            <input type="text" placeholder="商品名称/商品编号/订单号">
        </div>
        <el-tabs type="border-card" >
            <el-tab-pane label="全部">
                <div v-for="(qb,index) in qb" :key="index">
                    <div v-for="(it,index) in quanbu" :key="index">
                       <div style="float: left;width: 100%;border-bottom:1px solid #ccc">
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                            <h3 style="float:left">{{it.shop_name}}</h3>
                            <span  style="float:right">待支付</span>
                            </div>
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                                <img :src="path+it.img_cover" alt="图片" style="float:left;width: 58px;">
                                <p style="float:right;width: 80%;height: 40px;line-height: 20px;overflow: hidden;">{{it.goods_name}}</p>
                            </div>
                            <div style="height: 30px;float: right;line-height: 45px;padding-bottom: 10px;">
                                <span style="font-size: 12px;color: #ccc;padding-right: 10px;">共{{it.num}}件商品</span>
                                <span style="padding-right:10px;font-size: 14px;color: #ccc">应支付金额</span>
                                <span>￥{{it.money_now}}</span>
                            </div>
                       </div>
                       <div style="float:right;width:100%;padding-top:10px">
                           <!-- <p style="float:left;width:70%;text-align:right">剩余时间{{it.updatetime}}</p> -->
                           <span style="float:right;width:24%;text-align:center;border:1px solid #ccc;padding:10px;border-radius:20px;background:red;color:#fff">去支付</span>
                       </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待付款">
                <div >
                    <div v-for="(em,index) in fukuan" :key="index" >
                       <div style="float: left;width: 100%;border-bottom:1px solid #ccc">
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                            <h3 style="float:left">{{em.shop_name}}</h3>
                            <span  style="float:right">待付款</span>
                            </div>
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                                <img :src="path+em.img_cover" alt="图片" style="float:left;width: 58px;">
                                <p style="float:right;width: 80%;height: 40px;line-height: 20px;overflow: hidden;">{{em.goods_name}}</p>
                            </div>
                            <div style="height: 30px;float: right;line-height: 45px;padding-bottom: 10px;">
                                <span style="font-size: 12px;color: #ccc;padding-right: 10px;">共{{em.num}}件商品</span>
                                <span style="padding-right:10px;font-size: 14px;color: #ccc">应支付金额</span>
                                <span>￥{{em.money_now}}</span>
                            </div>
                       </div>
                       <div style="float:right;width:100%;padding-top:10px">
                           <!-- <p style="float:left;width:70%;text-align:right">剩余时间{{em.updatetime}}</p> -->
                           <span style="float:right;width:24%;text-align:center;border:1px solid #ccc;padding:10px;border-radius:20px;background:red;color:#fff">去支付</span>
                       </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待收货">
                <div >
                    <div v-for="(tm,index) in shouhuo" :key="index" >
                       <div style="float: left;width: 100%;border-bottom:1px solid #ccc">
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                            <h3 style="float:left">{{tm.shop_name}}</h3>
                            <span  style="float:right">待收货</span>
                            </div>
                            <div style="height:36px;float:left;width:100%;line-height:36px;">
                                <img :src="path+tm.img_cover" alt="图片" style="float:left;width: 58px;">
                                <p style="float:right;width: 80%;height: 40px;line-height: 20px;overflow: hidden;">{{tm.goods_name}}</p>
                            </div>
                            <div style="height: 30px;float: right;line-height: 45px;padding-bottom: 10px;">
                                <span style="font-size: 12px;color: #ccc;padding-right: 10px;">共{{tm.num}}件商品</span>
                                <span style="padding-right:10px;font-size: 14px;color: #ccc">应支付金额</span>
                                <span>￥{{tm.money_now}}</span>
                            </div>
                       </div>
                       <div style="float:right;width:100%;padding-top:10px">
                           <!-- <p style="float:left;width:70%;text-align:right">剩余时间{{tm.updatetime}}</p> -->
                           <span style="float:right;width:24%;text-align:center;border:1px solid #ccc;padding:10px;border-radius:20px;background:red;color:#fff">确认收货</span>
                       </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已完成">
                <div >
                   已完成
                </div>
            </el-tab-pane>
        </el-tabs>
        <div>
            没有更多订单了
        </div>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getOrderbyOrderId,getOrder } from "network/order";
export default {
  name: 'paygo',
  data(){
    return {
      path: "http://106.12.85.17:8090/public/image/goods/",
      aa:false
    }
  },
  components: {NavBar},
  computed: {},
  created(){
      setTimeout(() =>{
        this.aa = true;
      },1000)
      this.user_id = this.$store.state.userInfo.id
      console.log(this.$store.state.userInfo.id);
      getOrder({user_id:this.$store.state.userInfo.id}).then(res => {
          this.qb = res.data;
          console.log(res.data)
          for(var i=0;i<res.data.length;i++){
              getOrderbyOrderId(res.data[i].id).then(res =>{
                this.quanbu = res.data
                console.log(this.quanbu)
              })
          }
      })

      getOrder({user_id:this.$store.state.userInfo.id,state:2}).then(res => {
           console.log(res.data)
          for(var j=0;j<res.data.length;j++){
              getOrderbyOrderId(res.data[j].id).then(res =>{
                this.shouhuo = res.data
                console.log(this.shouhuo)
              })
          }     
      })

      getOrder({user_id:this.$store.state.userInfo.id,state:1}).then(res => {
           console.log(res.data)
          for(var p=0;p<res.data.length;p++){
              getOrderbyOrderId(res.data[p].id).then(res =>{
                this.fukuan = res.data
                console.log(this.fukuan)
              })
          }
          
      })

  },
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  watch: {},
  filter:{}
}
</script>

