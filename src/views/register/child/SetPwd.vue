<style lang="less">
#SetPwd {
  .content {
    padding: 20px;
    p {
      text-align: left;
      margin-bottom: 20px;
    }
    input[type="text"]:focus {
      border-color: #dcdfe6;
    }
    p.tips {
      font-size: 12px;
      margin-top: 8px;
    }
    input[type="text"] {
      border-color: #dcdfe6;
      outline: none;
    }
    button.submit {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
<template>
  <div id="SetPwd">
    <nav-bar>
      <div slot="left">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      </div>
      <div slot="center">京东注册</div>
    </nav-bar>
    <div class="content">
      <p>请输入账户密码:</p>
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <p class="tips">{{msg}}</p>
      <el-button type="danger" round class="submit" :disabled="isSubmit" @click="submit">提交</el-button>
    </div>
    {{$route.params.data}}
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { register } from "network/user";
export default {
  name: "SetPwd",
  data() {
    return {
      pwd: "",
      isSubmit: true,
      msg: "请输入8~15位的密码，首字符不能是数字下划线",
    };
  },
  watch: {
    pwd(val) {
      let reg = /^[a-zA-Z][\w]{7,14}$/;
      console.log(reg.test(val));
      if (reg.test(val)) {
        this.isSubmit = false;
        this.msg = "密码可用";
      } else {
        this.isSubmit = true;
        this.msg = "请输入8~15位的密码，首字符不能是数字下划线";
      }
    },
  },
  components: {
    //组件
    NavBar,
  },
  methods: {
    //事件
    submit() {
      console.log(this.$route.params.data);
      let data = JSON.parse(this.$route.params.data);
      data.password = this.pwd;
        console.log(data);
      //向服务器提交请求
      register(data).then((res) => {
        console.log(res);
        if(res.code != 200 ) return console.log('网络连接错误/数据库连接有误');
        this.$router.push('/login')
      });
    },
  },
};
</script>
