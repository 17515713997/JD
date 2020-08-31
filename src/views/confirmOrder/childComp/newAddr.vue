<style lang='less' scoped>
#newaddr {
  .box {
    line-height: 44px;
    background-color: #fff;
    overflow: hidden;
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
              margin-top: 10px;
              font-size: 12px;
            }
          }
          .el-switch {
            flex: 2;
          }
        }
      }
    }
    .takeover {
      button {
        width: 52px;
        height: 26px;
        margin-right: 6px;
        border: 1px solid #dcdcdc;
        outline: none;
        font-size: 12px;
        border-radius: 13px;
        color: rgb(126, 126, 126);
      }
    }
    .takeoverFixed {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 500;
      .box {
        position: absolute;
        left: 15%;
        right: 15%;
        top: 35%;
        bottom: 40%;
        background-color: #fff;
      }
    }
    .tagactive {
      border-color: cornflowerblue !important;
    }
  }
}
</style>
<template>
  <div id="newaddr">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{ code == 0 ? '新增收货':'修改配送地址'}}</div>
    </nav-bar>
    <div class="box">
      <div class="inputBox">
        <span>收货人</span>
        <div>
          <el-input v-model="address.name" placeholder="姓名"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>联系方式</span>
        <div>
          <el-input v-model="address.phone" placeholder="手机号码"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>所在地区</span>
        <div @click="addrShow(1)">
          <!-- <span v-if='address.nowAddr.length>1'>
            <span v-for='(i,index) in address.nowAddr' :key="index"> {{i}}&nbsp;</span>
          </span> 
          <span v-else>选择所在地区</span>-->
          <!-- 过滤函数 -->
          <span>{{address.nowAddr | getNowAddr }}</span>
          <p class="right el-icon-arrow-right"></p>
        </div>
      </div>
      <div class="inputBox">
        <span>详细地址</span>
        <div>
          <el-input
            type="textarea"
            v-model="address.particular"
            :autosize="{ minRows: 3, maxRows: 3}"
            placeholder="详细地址需填写楼栋楼层或房间号信息"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="inputBox takeover">
        <span>地址标签</span>
        <div>
          <button
            v-for="(item,index) in takeoverArr"
            :key="index"
            @click="setTakeover(item,index)"
            :class="{tagactive:active == index}"
          >{{item}}</button>
          <el-button
            type="text"
            @click="addTakeoverTag"
            v-if="takeoverArr.length != 4"
            class="add"
          >+</el-button>
          <!-- <button @click="addTakeoverTag" v-if="takeoverArr.length != 4">+</button> -->
          <span class="el-icon-edit-outline" v-if="takeoverArr.length==4" @click="addTakeoverTag"></span>
        </div>
      </div>
      <div class="takeoverFixed" v-if="false">
        <div class="box">
          <!-- <input type="text" v-model='test'> -->
        </div>
      </div>
      <div class="inputBox">
        <div>
          <el-button
            type="danger"
            class="submit"
            round
            @click="submitAddr"
          >{{code == 0 ? '保存并使用该地址' : '确认'}}</el-button>
          <button
            v-if="this.code != 0"
            style="width:90%;margin:5px 5%;height:40px;border:none;outline:none;border-radius:20px;"
            @click="deleteAddr"
          >删除</button>
          <div class="defBox">
            <div>
              <b>设置默认地址</b>
              <p>提醒:每次下单都会默认使用该地址</p>
            </div>
            <el-switch v-model="address.default" active-color="#ff4949" inactive-color="#eee"></el-switch>
          </div>
        </div>
      </div>

      <el-drawer title="所在地区" :visible.sync="addr" direction="btt" size="80%">
        <!-- editableTabsValue 和 el-tab-pane 标签上的name属性值相等的时候，该 标签就是被选中的标签 -->
        <el-tabs v-model="editableTabsValue">
          <!-- 选项卡标签 -->
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.active"
          >
            <!-- 选项卡内容 -->
            <scroll class="newAddr-content" :probeType="3" :pull-up-load="true">
              <!-- <button @click="addAreaTab(item)">点击按钮{{item.active}}</button> -->
              <p
                v-for="i in item.content"
                :key="i.id"
                @click="addAreaTab(item,i)"
              >{{ i[item.type] }}</p>
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
//地址请求
import {
  getProvinces,
  getCities,
  getAreas,
  creat_user_address,
  get_user_address,
  update_user_address,
  delete_user_address,
} from "network/address";
export default {
  name: "newAddr",
  data() {
    return {
      phoneOk: false,
      address: {
        name: "",
        phone: "",
        nowAddr: [], //地址   省市县(区)
        particular: "", //详细地址 (街道/小区)
        tag: "", //标签   家 学校  公司   指定地址
        default: true,
      },
      addr: false, //用于显示/隐藏 选择城市的遮罩层
      editableTabsValue: "0", //当前被选中的值
      editableTabs: [
        //跟省市县 匹配的选项卡
        {
          title: "请选择",
          active: "0",
          type: "province",
          content: null,
        },
      ],
      takeoverArr: ["公司", "家", "学校"],
      areaArr: ["province", "city", "area"],
      code: null,
      active: -1, // 地址标签被选中的对比值
    };
  },
  created() {
    // console.log(this.$route.params.code);
    //code 实际上是地址的id编号,传0的时候代表没有编号，新增 ,不是0的时候，就是有编号，就应该修改指定编号的值
    this.code = this.$route.params.code;
    // console.log(this.code);
    if (this.code != 0) {
      //做地址请求   ---> 添加后在做地址请求
      get_user_address({
        user_id: 15,
        address_id: this.code,
      }).then((res) => {
        let addr = res.data[0];
        //做地址赋值，从vuex中取出要修改的地址，存到当前组件中，并使用
        this.address.name = addr.takeover_name;
        this.address.phone = addr.takeover_tel;
        // console.log(addr.takeover_addr);
        let arr = addr.takeover_addr.split(",");
        this.address.particular = arr.pop();
        this.address.nowAddr = arr;
        this.address.tag = addr.takeover_label;
        this.address.default = addr.default == 1 ? true : false;
        //判断 地址标签中是否存有 获取的地址标签
        //做地址标签的 选中
        if (addr.takeover_label != "") {
          this.active = this.takeoverArr.indexOf(addr.takeover_label);
          if (this.active == -1) {
            this.takeoverArr.push(addr.takeover_label);
            this.active = 3;
          }
        }
        //修改城市位置点击后出现的遮罩层的数据
        // console.log(this.address);
        // console.log(this.address.nowAddr);
        this.editableTabs = [];
        for (let i = 0; i < this.address.nowAddr.length; i++) {
          this.editableTabs[i] = {};
          this.editableTabs[i].title = this.address.nowAddr[i];
          this.editableTabs[i].active = i + "";
          this.editableTabs[i].type = this.areaArr[i];
          this.editableTabs[i].content = null;
        }
        //先把选项卡渲染出来后在请求数据

        getProvinces().then((res) => {
          this.editableTabs[0].content = res.data;
          //从res.data中取出指定值的id
          let pid = res.data.filter((item) => {
            if (item.province == this.address.nowAddr[0]) {
              return true;
            }
            return false;
          });
          getCities({ provinceid: pid[0].provinceid }).then((res) => {
            this.editableTabs[1].content = res.data;
            let cid = res.data.filter((item) => {
              if (item.city == this.address.nowAddr[1]) {
                return true;
              }
              return false;
            });
            getAreas({ cityid: cid[0].cityid }).then((res) => {
              this.editableTabs[2].content = res.data;
            });
          });
        });
      });
    }
  },
  activated() {},
  components: { navBar, Scroll },
  watch: {},
  methods: {
    //1.2.对地址标签添加新值/修改值
    addTakeoverTag() {
      this.$prompt("", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true, //是否居中
        showClose: false, //不显示x
      })
        .then(({ value }) => {
          if (!value) return;
          //在element ui 组件的弹框中。改变数据属于异步加载数据，所以需要使用Vue.set的方式改变数组中的数据。不然不能实现数据监听。当修改数据时，数组可以改变。但是页面数据不变。所以为了简化，。通过使用pop的方式 先把末尾一位的数据弹出。在添加
          if (this.takeoverArr[3]) this.takeoverArr.pop();
          this.takeoverArr[3] = value;
          this.active = this.takeoverArr.length - 1;
          this.address.tag = value;
        })
        .catch(() => {});
    },
    //3.用于设置 地址标签。
    setTakeover(val, index) {
      //如果点击的是相同的元素
      if (val == this.address.tag) {
        this.address.tag = "";
        this.active = "-1";
        return;
      }
      //不是相同的元素
      this.active = index;
      this.address.tag = val;
    },
    //4.addrShow   地址 显示
    addrShow() {
      this.addr = true;
      //加载省份数据
      if (this.editableTabs[0].content == null) {
        this.getProvinces();
      }
    },
    //获取省份
    getProvinces() {
      getProvinces().then((res) => {
        console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[0].content = res.data;
      });
      // console.log(this.editableTabs);
    },
    //获取市
    getCities(data) {
      getCities(data).then((res) => {
        // console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[1].content = res.data;
      });
      console.log(this.editableTabs);
    },
    //获取区/县
    getAreas(data) {
      getAreas(data).then((res) => {
        // console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[2].content = res.data;
      });
    },
    //为选项卡 添加title值，并且创建下一个选项卡出现
    addAreaTab(obj, temp) {
      // console.log(obj.active);
      //设置当前选项按钮的title值
      // type >>   "province", "city", "area"

      this.editableTabs[obj.active].title = temp[obj.type];
      // 创建下一个按钮的active值
      let newActive = obj.active * 1 + 1 + "";
      if (newActive < 3) {
        //每次选择的时候，都会从新截取一下选中值 之前的数据
        let a = this.editableTabs.slice(0, obj.active * 1 + 1);
        this.editableTabs = a;
        // console.log(this.editableTabs);
        //添加下一个选项按钮
        this.editableTabs.push({
          title: "请选择",
          active: newActive,
          type: this.areaArr[newActive],
          content: "",
        });
        this.editableTabsValue = newActive;
        if (newActive == 1) this.getCities({ provinceid: temp.provinceid });
        if (newActive == 2) this.getAreas({ cityid: temp.cityid });
      }
      if (newActive == 3) {
        this.addr = false;
        this.address.nowAddr = [];
        //取出选项卡按钮上的值，拼接起来
        this.editableTabs.forEach((item) => {
          this.address.nowAddr.push(item.title);
        });
      }
    },
    submitAddr() {
      let pattern = /^(13|14|15|17|18)[0-9]{9}$/;
      if (this.address.name == "") return alert("收货人不能为空");
      if (this.address.phone == "") return alert("电话不能为空");
      if (!pattern.test(this.address.phone))
        return alert("请输入正确格式的手机号");
      if (this.address.nowAddr.length == 0) return alert("城市不能为空");
      if (this.address.particular == "") return alert("收详细地址不能为空");

      let data = {};
      data.user_id = this.$store.state.userInfo.id;
      data.takeover_name = this.address.name;
      data.takeover_tel = this.address.phone;
      data.takeover_addr =
        this.address.nowAddr.join(",") + "," + this.address.particular;
      data.takeover_label = this.active != -1 ? this.address.tag : "";
      data.default = this.address.default ? 1 : 0;
      if (this.code == 0) {
        // 新增   指定提交字段6
        creat_user_address(data).then((res) => {
          // console.log(res);
          if (res.code != 200)
            return console.log("添加地址超时/服务器连接失败/或指定字段错误");
          // this.$store.state.ShoppingAddress = res.data   新创建的id
          this.$store.state.ShoppingAddress = data;
          //跳转到指定的订单页面
          //if跳转只为测试的时候刷新页面。上一次的记录就没了
          if (!this.$store.state.configOrderHistory) this.$router.push("/cart");
          this.$router.push(this.$store.state.configOrderHistory);
        });
      } else {
        //修改  指定提交字段7
        data.address_id = this.code;
        update_user_address(data).then((res) => {
          if (res.code != 200)
            return console.log("添加地址超时/服务器连接失败/或指定字段错误");
          this.$store.state.ShoppingAddress = data;
          if (!this.$store.state.configOrderHistory) this.$router.push("/cart");
          this.$router.push(this.$store.state.configOrderHistory);
          //如果修改成功购。我需要判断修改的数据 是否提交了默认地址。如果提交默认地址。则改变现有userInfo的defaddr
          if (data.default == 1) {
            this.$store.userInfo.defaddr = data;
          }
        });
      }
    },
    deleteAddr() {
      delete_user_address({ address_id: this.code }).then(() => {
        // console.log(res);
        this.$router.go(-1);
      });
      // console.log(`删除指定ID = ${this.code} 的收货地址`);
    },
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    },
  },
  filters: {
    getNowAddr(val) {
      // let temp ='选择所在地区'
      // if(val.length > 1){
      //   temp = val.join(' ')
      // }
      // return temp
      return val.length > 1 ? val.join(" ") : "选择所在地区";
    },
  },
};
</script>

<style lang="less">
#newaddr {
  .el-input .el-input__inner,
  .el-textarea .el-textarea__inner {
    border: 1px solid transparent;
    padding: 10px;
  }
  .el-button.add {
    padding: 0;
  }
  .el-button.submit {
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
}
.el-message-box__wrapper {
  width: 80%;
  left: 10%;
  top: 30%;
  .el-message-box.el-message-box--center {
    width: 90%;
    margin: 0 5%;
  }
}
</style>