<style lang="less">
/* 把css改成全局的..  不是当前范围使用的*/
#ShortMessage {
  .warning {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .dialog {
      position: absolute;
      top: 30%;
      left: 10%;
      right: 10%;
      bottom: 40%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      font-size: 16px;
      .content {
        margin-top: 40px;
        padding: 0 30px;
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
  .notice {
    padding: 20px;
  }
  .content{
    padding:20px;
    input[type=text]:focus{
      border-color:#DCDFE6;
    }
    input[type=text]{
      border-color:#DCDFE6;
      outline: none;
    }
    .next{
      margin-top:40px;
      width: 100%;
    }
  }
}
</style>
<template>
  <div id="ShortMessage">
    <nav-bar>
      <div slot="left">
        <i class="el-icon-arrow-left" @click="warning = true"></i>
      </div>
      <div slot="center">京东注册</div>
    </nav-bar>
    <div class="notice">
      <div class="codeImg">{{phoneCode}}</div>
      <p>我们将以短信或电话的形式将验证码发送给您,请注意接听0575/025/0592/010等开头的电话</p>
    </div>

    <div class="content">
      <el-input placeholder="请输入验证码" v-model="regCode" class="input-with-select">
        <el-button slot="append" @click="getCode" :disabled="isDisabled">{{msg}}</el-button>
      </el-input>

      <el-button type="danger" round class="next" :disabled="regCode ==''? true:false" @click="next">下一步</el-button>
    </div>

    <div v-if="warning" class="warning">
      <div class="dialog">
        <div class="content">
          <p>点击"返回"将中断注册,确认返回?</p>
        </div>
        <div class="footer">
          <button class="cancel" @click="warningOk">取消</button>
          <button class="ok" @click="warningOk('ok')">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getCodeImg } from "network/user";
export default {
  name: "ShortMessage",
  data() {
    return {
      //点击返回按钮的时候，确认框 判断warning
      warning: false,
      phoneCode: null,
      regCode: "",
      msg: "发送验证码",
      phone: null,
      svg: "",
      isDisabled: false,
    };
  },
  components: {
    //组件
    NavBar,
  },
  computed: {
    //计算
  },
  created() {
    //在页面创建的时候，先获取到从上个页面传递过来的电话号
    this.phone = JSON.parse(this.$route.params.data).telphone;
    this.getCode();
  },
  methods: {
    //事件
    warningOk(val) {
      if (val == "ok") {
        this.$router.go(-1);
      }
      this.warning = false;
    },
    getCode() {
      this.isDisabled = true;
      getCodeImg({
        telphone: this.phone,
      }).then((res) => {
        console.log(res);
        if (res.code != 200) return;
        this.phoneCode = res.str;
      });
      this.timeout();
      this.msg = "重新发送(60)";
    },
    //创建定时器
    timeout() {
      let num = 60;
      let timer = setInterval(() => {
        num--;
        this.msg = "重新发送(" + num + ")";
        if (num == 0) {
          this.msg = "发送验证码";
          clearInterval(timer);
          this.isDisabled = false;
        }
      }, 1000);
    },
    next(){
      if(this.regCode != this.phoneCode) return 
      this.$router.push('/setpwd/'+this.$route.params.data)
    }
  },
};
</script>
