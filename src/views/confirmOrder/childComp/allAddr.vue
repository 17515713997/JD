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
              <span >{{i}}</span>
            </p>
          </div>
        </div>
        <div class="rightBox">编辑</div>
      </div>
    </div>

    <div class="tabbar">
      <el-button type="danger" round @click="$store.commit('ROUTERTO','/newAddr')">新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "allAddr",
  activated() {
  },
  data() {
    return {
      allAddress: null,
      radio: "1",
    };
  },
  watch: {
  },
  components: { navBar },
  methods: {
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    },
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
        width: 24px;
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
