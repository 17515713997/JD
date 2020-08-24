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
        <div @click="addrShow">
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
      <div class="inputBox">
        <span>地址标签</span>
        <div>
          <button style="width: 60px;height: 35px;"
            v-for="(item,index) in takeoverArr"
            :key="index"
            @click="setTakeover(item,index)"
            :class="{tagactive:active == index}"
          >{{item}}</button>
          <el-button @click="addTakeoverTag" v-if="takeoverArr.length != 4" style="width: 60px;height: 35px;">+</el-button>
          <span class="el-icon-edit-outline" v-if="takeoverArr.length==4" @click="xiugai"></span>
        </div>
      </div>
      <div class="inputBox">
        <div>
          <el-button type="danger" round @click="submitAddr">{{code == 0 ? '保存并使用该地址' : '确认'}}</el-button>
          <div class="defBox" v-show="true">
            <div>
              <b>设置默认地址</b>
              <p>提醒:每次下单都会默认使用该地址</p>
            </div>
            <el-switch v-model="def" active-color="#ff4949" inactive-color="#eee"></el-switch>
          </div>
        </div>
      </div>
      <!-- <div class="hiee" >
        111
      </div> -->
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
import { getProvinces, getCities, getAreas } from "network/address";
export default {
  name: "newAddr",
  data() {
    return {
      phoneOk: false,
      address: {
        name: "",
        phone: "",
        nowAddr: ["山东省", "菏泽市", "曹县"], //地址   省市县(区)
        particular: "", //详细地址 (街道/小区)
        tag: "", //标签   家 学校  公司   指定地址
      },
      addr: false, //用于显示/隐藏 选择城市的遮罩层
      editableTabsValue: "0", //当前被选中的值
      editableTabs: [
        {
          title: "请选择",
          active: "0",
          type: "province",
          content: "",
        },
      ],
      takeoverArr: ["公司", "家", "学校"],
      areaArr: ["province", "city", "area"],
      tabIndex: 0,
      def: false,
      code: null,
      active: -1, // 地址标签被选中的对比值
    };
  },
  created() {
    // console.log(this.$route.params.code);
    //code 实际上是地址的id编号,传0的时候代表没有编号，新增 ,不是0的时候，就是有编号，就应该修改指定编号的值
    this.code = this.$route.params.code;
    if (this.code != 0) {
      //做地址请求
      //做地址赋值，从vuex中取出要修改的地址，存到当前组件中，并使用
    }
  },
  activated() {},
  components: { navBar, Scroll },
  watch: {},
  methods: {
    //1.对地址标签添加新值
    // addTakeoverTag() {
    //   this.takeoverArr.push("aaaaa");
    // },
    addTakeoverTag() {
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
    },
    //2.对 地址标签添加的新值 进行修改
    xiugai() {},
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
      this.getProvinces();
    },
    //获取省份
    getProvinces() {
      getProvinces().then((res) => {
        console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[0].content = res.data;
      });
      console.log(this.editableTabs);
    },
    //获取市
    getCities(data) {
      getCities(data).then((res) => {
        console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[1].content = res.data;
      });
      console.log(this.editableTabs);
    },
    //获取区/县
    getAreas(data) {
      getAreas(data).then((res) => {
        console.log(res);
        //对地址选项卡省份设置值
        this.editableTabs[2].content = res.data;
      });
      console.log(this.editableTabs);
    },
    //为选项卡 添加title值，并且创建下一个选项卡出现
    addAreaTab(obj, temp) {
      console.log(obj.active);
      console.log(temp);
      //设置当前选项按钮的title值
      // type >>   "province", "city", "area"

      this.editableTabs[obj.active].title = temp[obj.type];
      // 创建下一个按钮的active值
      let newActive = obj.active * 1 + 1 + "";
      console.log(newActive, "----------------------");
      if (newActive < 3) {
        //每次选择的时候，都会从新截取一下选中值 之前的数据
        this.editableTabs = this.editableTabs.slice(0, obj.active + 1);
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
      if (this.address.name == "") return alert("收货人不能为空");
      if (this.address.phone == "") return alert("电话不能为空");
      if (this.address.nowAddr.length == 0) return alert("城市不能为空");
      if (this.address.particular == "") return alert("收详细地址不能为空");

      let data = {};
      data.user_id = this.$store.state.userInfo.id;
      data.takeover_name = this.address.name;
      data.takeover_tel = this.address.phone;
      data.takeover_addr =
        this.address.nowAddr.join(",") + "," + this.address.particular;
      data.takeover_label = this.address.tag

      console.log(data);
      if(this.code == 0) {
        //请求添加数据
      }else{
        //请求修改数据
      }


      
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
    aaa(val, item) {
      console.log(val);
      console.log(item);
    },
  },
};
</script>
<style lang='less' scoped>
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
  .tagactive {
    background-color: red;
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