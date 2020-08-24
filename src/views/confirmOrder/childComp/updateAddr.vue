<template>
  <div id="newaddr">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">编辑收货地址</div>
    </nav-bar>
    <div class="box">
      <div class="inputBox">
        <span>收货人</span>
        <div>
          <el-input v-model="name" placeholder="姓名"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>联系方式</span>
        <div>
          <el-input v-model="phone" placeholder="手机号码" maxlength="11"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>所在地区</span>
        <div>
          <span v-if="nowAddr.length>1">
            <span v-for="(i,index) in nowAddr" :key="index">{{i}} &nbsp;</span>
          </span>
          <span v-else>选择所在地区</span>
          <p class="right el-icon-arrow-right"></p>
        </div>
      </div>
      <div class="inputBox">
        <span>详细地址</span>
        <div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3}"
            placeholder="详细地址需填写楼栋楼层或房间号信息"
            v-model="particular"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>地址标签</span>
        <div>
          <el-radio-group v-model="tag" size="small">
            <el-radio-button label="公司"></el-radio-button>
            <el-radio-button label="家"></el-radio-button>
            <el-radio-button label="学校"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="inputBox">
        <div>
          <el-button
            :disabled="!name||!phoneOk||!nowAddr||!particular"
            type="danger"
            round
          >{{true ? '保存并使用该地址' : '确认'}}</el-button>
          <div class="defBox" v-show="true">
            <div>
              <b>设置默认地址</b>
              <p>提醒:每次下单都会默认使用该地址</p>
            </div>
            <el-switch v-model="def" active-color="#ff4949" inactive-color="#eee"></el-switch>
          </div>
        </div>
      </div>

      <el-drawer title="所在地区" :visible.sync="addr" direction="btt" size="80%">
        <el-tabs v-model="editableTabsValue">
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <scroll class="newAddr-content" :probeType="3" :pull-up-load="true">
              <div v-if="item.type=='province'">
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.province}}</p>
              </div>
              <div v-else-if="item.type=='city'">
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.city}}</p>
              </div>
              <div v-else>
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.area}}</p>
              </div>
            </scroll>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "newAddr",
  data() {
    return {
      name: "",
      phone: "",
      phoneOk: false,
      nowAddr: [], //地址
      particular: "", //详细地址
      tag: "",
      addr: false,
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "请选择",
          name: "1",
          type: "province",
          content: "Tab 1 content",
        },
      ],
      tabIndex: 1,
      def: false,
    };
  },
  activated() {
  },
  components: { navBar, Scroll },
  watch: {
  },
  methods: {
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    },
  },
};
</script>
<style lang='less' scoped>
.box {
  line-height: 44px;
  background-color: #fff;
  overflow: hidden;
  padding-top: 50px;
  .inputBox {
    border-top: 1px solid rgba(209, 209, 209, 0.37);
    display: flex;
    span {
      flex: 2;
      font-size: 13px;
      color: rgb(149, 149, 149);
    }
    div {
      text-align: left;
      flex: 8;
      color: rgb(192, 192, 192);
      p {
        padding-right: 10px;
      }
      .defBox {
        display: flex;
        padding: 10px;
        div {
          flex: 10;
          color: #333;
          line-height: 10px;
          p {
            font-size: 12px;
          }
        }
        .el-switch {
          flex: 2;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-input .el-input__inner,
.el-textarea .el-textarea__inner {
  border: 1px solid transparent;
  padding: 10px 0;
}
.el-button {
  width: 90%;
  margin: 20px;
}
.el-drawer {
  border-radius: 20px 20px 0 0;
  :focus {
    outline: 0;
  }
  .el-drawer__body {
    padding-left: 15px;
    .newAddr-content {
      height: 60vh;
      overflow: hidden;
      p {
        text-align: left;
        margin: 0;
      }
    }
    .el-tabs__item.is-active {
      color: #f2270c;
    }
    .el-tabs__active-bar {
      background-color: #f2270c;
    }
  }
  .el-drawer__header {
    font-weight: bold;
    color: black;
    font-size: 16px;
    padding: 6px;
    margin: 0;
  }
}
</style>