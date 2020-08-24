<style lang="less">
@width: 100%;
#register {
  height: 100vh;
  .next {
    height: 50px;
    border-radius: 25px;
    background: rgba(255, 0, 0, 1);
    font-size: 20px;
    width: @width * 0.94;
    margin: 20px 2%;
    color: #fff;
    font-weight: bold;
    outline: none;
    border: none;
  }
  .next.disabled {
    background: rgba(255, 0, 0, 0.3);
  }
  .inputBox {
    display: flex;
    width: @width * 0.94;
    margin: 0 2%;
    line-height: 56px;
    box-shadow: 0 1px 0px silver;
    color: black;
    span {
      flex: 1;
    }
    .el-input {
      flex: 4;
      .el-input__inner {
        border: none;
      }
    }
  }
  .warning{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog{
      position:absolute;
      top:30%;
      left:10%;
      right:10%;
      bottom:40%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      font-size: 16px;
      .content{
        margin-top:40px;
        padding:0 30px;
        text-align: left;
      }
      .footer {
        width: 100%;
        display: flex;
        height: 50px;
        position: absolute;
        bottom: 0;
        button {
          flex: 1;
          font-size: 18px;
          outline: none;
          border: none;
        }
        .ok {
          background-color: red;
          color: #fff;
        }
      }
    }
  }
  .dialogBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog {
      position: absolute;
      left: 5%;
      right: 5%;
      top: 23%;
      bottom: 23%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      font-size: 16px;
      .content {
        height:calc(100% - 50px);
        padding: 0 12px;
        .header {
          line-height: 50px;
        }
        .dialogScroll {
          height:calc(100% - 120px);
          text-align: left;
          line-height: 24px;
          overflow: hidden;
        }
        .agreement {
          height:70px;
        }
      }
      .footer {
        width: 100%;
        display: flex;
        height: 50px;
        position: absolute;
        bottom: 0;
        button {
          flex: 1;
          font-size: 18px;
          outline: none;
          border: none;
        }
        .ok {
          background-color: red;
          color: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <div id="register">
    <nav-bar>
      <div slot="left">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      </div>
      <div slot="center">京东注册</div>
    </nav-bar>
    <div>
      <div class="inputBox">
        <router-link to='/area_code' tag="span">
          {{area_code}}
          <span class="el-icon-arrow-down"></span>
        </router-link>
        <el-input placeholder="请输入手机号" v-model="phone" clearable></el-input>
      </div>
      <input
        type="button"
        @click="next"
        :disabled="regTel"
        value="下一步"
        :class="{next:true,disabled:regTel}"
      />
    </div>
    <!-- 页面初始模态框 -->
    <div v-if="show" class="dialogBox">
      <div class="dialog">
        <div class="content">
          <div class="header">注册协议及隐私政策</div>
          <div class="agreement">
            <p>
              点击同意即表示您已阅读并同意
              <a href="https:/in.m.jd.com/help/app/register_info.html">《京东用户注册协议》</a>
              与
              <a href="https://in.m.jd.com/help/app/private_policy.html">
                《
                京东隐私策》
              </a>并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于
              <a href="https://in.m.jd.com/help/app/order_sharing_info.html">《订单共享与安全》</a>
            </p>
          </div>
        </div>

        <div class="footer">
          <button class="cancel" @click="checkDialog">不同意</button>
          <button class="ok" @click="checkDialog('ok')">同意</button>
        </div>
      </div>
    </div>
    <!-- 手机号可以注册,下面的模态框显示 -->
    <div v-if="warning" class="warning">
      <div class="dialog">
        <div class="content">
          <p>我们将发送短信/语音验证码至:</p>
          <p>{{phone}}</p>
        </div>
        <div class="footer">
          <button class="cancel" @click="warningOk">不同意</button>
          <button class="ok" @click="warningOk('ok')">同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { regPhone} from "network/user";
export default {
  name: "",
  data() {
    return {
      phone: "",
      phone_area_code: null, //国际区号
      regTel: true,
      // area_code:100,
      warning:false,  //手机号可以注册时，弹出框显示      
    };
  },
  components: {
    //组件
    NavBar,
  },
  computed: {
    area_code(){
      return this.$store.state.area_code
    },
    show(){
      return this.$store.state.registreDialogShow
    }
  },
  watch: {
    //监听
    phone(val) {
      let pattern = /^(13|14|15|17|18)[0-9]{9}$/;
      this.regTel = !pattern.test(val);
    },
    area_code() {
      console.log;
    },
  },
  methods: {
    next() {
      var data = { telphone: this.phone };
      regPhone(data).then((res) => {
        console.log(res);
        // res.code == 500 代表用于已经注册
        if (res.code == 500) {
          //把用户注册的时间提取出来。转换成时间格式  2020-06-26T06:42:43.000Z
          let createTime = new Date(res.data.createtime);
          let newDate = new Date();
          //Difference  差值毫秒数
          //   new Date().getTime()  获取当前时间到1970年的毫秒值
          let Difference = newDate.getTime() - createTime.getTime();
          if (Difference > 30 * 24 * 60 * 60 * 1000) {
            //注册时间大于3天  跳转页面  并传递用户数据过去
            this.$router.push("/registered/" + JSON.stringify(res.data));
            return;
          }
          alert("该手机号已被其他账号绑定,30天内不可改绑");
          return;
        }
        //如果不是500 ,手机号是未被注册的，跳转短信页面  并传递电话信息过去
        this.warning = true;
        // this.$router.push("/shortMsg/" + JSON.stringify(data));
      });
    },
    warningOk(val){
      if(val == 'ok'){
        let data = {};
        data.areacode = this.area_code;
        data.telphone = this.phone;
        console.log(data);
        this.$router.push("/shortMsg/" + JSON.stringify(data));
      }
      this.warning = false;
    },
    checkDialog(val) {
      if (val == "ok") {
        //此处改变的是状态管理内的值，所以在页面开来的时候，需要把值重新赋值为true
        this.$store.state.registreDialogShow = false;
        return;
      }
      this.$router.go(-1);
    },
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log(to.path);
    //离开页面的时候，需要把 registreDialogShow 重新赋值为true 下次打开页面的时候，协议显示
    this.$store.state.registreDialogShow = true    
    if(to.path == '/area_code') this.$store.state.areacodeHistory = from.path
    next()
  },
  filters: {
    regPhone(val) {
      let pattern = /^0?(13|14|15|17|18)[0-9]{9}$/;
      return pattern.test(val);
    },
  },
};
</script>
