<template>
  <div id="upaddr">
    <nav-bar class="sC-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">收货地址</div>
    </nav-bar>
    <div class="bigBox">
      <div class="box" v-for="i in allAddress" :key="i.id">
        <div class="leftBox" @click="updataDef(i)">
          <span class="radioBox">
            <el-radio v-model="radio" :label="i.default"></el-radio>
          </span>
          <div>
            <p>
              <strong></strong>
            </p>
            <p style="font-size:12px;">
             <ul>
                <li>{{i.takeover_name}}</li>
                <li>{{i.takeover_tel}}</li>
                <li>{{i.takeover_addr}}</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="rightBox" @click="$store.commit('ROUTERTO','/newAddr/' + i.id)">编辑</div>
      </div>
    </div>

    <div class="tabbar">
      <el-button type="danger" round @click="$store.commit('ROUTERTO','/newAddr/0')">新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
//获取所有的收货地址
import { get_user_address } from "network/address";
import { autoLand } from "network/user";

import { SET_USERINFO } from "store/mutation-types";
export default {
  name: "allAddr",
  created() {
    //先请求下用户 ， 后期删除
    if (!this.$store.state.userInfo) {
      let path = window.location.origin + "/jd";
      let autocode = window.localStorage.getItem(path);
      autoLand({
        autocode: autocode,
      }).then((res) => {
        console.log(res);
        if (res.code != 200) return;
        this.$store.commit(SET_USERINFO, res);
      });
    }
    //延迟请求收货地址， 后期去掉定时器
    setTimeout(() => {
      get_user_address({
        user_id: this.$store.state.userInfo.id,
      }).then((res) => {
        console.log(res);
        this.$store.state.allAddress = res.data;
      });
    }, 500);
  },
  data() {
    return {
      radio: "1",
    };
  },
  watch: {},
  components: { navBar },
  methods: {
    updataDef(val) {
      console.log(val);
      this.$store.state.ShoppingAddress = val;
      this.$router.go(-1)      
    },
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    },
    allAddress(){
      return this.$store.state.allAddress == null ? [] :this.$store.state.allAddress
    }
  },
  filters: {
    hiddenPhone(val) {
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return val.replace(reg, "$1****$2");
    },
  },
};
</script>
<style lang='less' scoped>
.bigBox {
  margin-top: 50px;
  background-color: #fff;
  .box {
    border-top: 1px solid rgba(238, 238, 238, 0.589);
    display: flex;
    line-height: 44px;
    padding: 10px;
    .leftBox {
      text-align: left;
      flex: 10;
      display: flex;
      .radioBox {
        width: 60px;
        overflow: hidden;
      }
      p {
        margin: 0;
        line-height: 22px;
      }
    }
    .rightBox {
      flex: 1;
      color: rgb(224, 15, 15);
    }
  }
}
.tabbar {
  position: fixed;
  width: 100%;
  bottom: 20px;
  .el-button {
    width: 94%;
    background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
  }
}
</style>
