<style lang="less" scoped>
.evaluate {
  border-radius: 10px;
  margin-top: 10px;
  background-color: #fff;
  text-align: left;
  padding: 5px 10px;
  .head {
    display: flex;
    font-size: 20px;
    line-height: 40px;
    span:nth-child(1) {
      padding-left: 5px;
      flex: 1;
      i {
        font-style: normal;
        font-size: 14px;
        margin-left: 10px;
        vertical-align: text-top;
      }
    }
    span:nth-child(2) {
      margin-top: 8px;
      line-height: 30px;
      font-size: 16px;
      flex: 1;
      text-align: right;
      padding-right: 5px;
      vertical-align: text-top;
      i {
        font-style: normal;
        font-size: 12px;
        margin-left: 3px;
        vertical-align: text-top;
      }
    }
  }
  .content {
    .title {
      display: flex;
      margin-bottom: 10px;
      line-height: 30px;
      .user {
        flex: 2;
        font-weight: bold;
        margin-left: 10px;
      }
      .evaluateTime {
        flex: 1;
        text-align: left;
        text-align: right;
      }
    }
    .value {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
      -webkit-line-clamp: 3; /*用来限制在一个块元素显示的文本的行数。*/
      -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
      margin-bottom: 10px;
    }
    .evaluateImg {
      width: 100%;
      overflow: hidden;
      ul {
        /*不压缩空间*/
        flex-shrink: 0;
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        li {
          margin-bottom: 5px;
          min-width: 21vw;
          max-width: 24vw;
          width: 22vw;
          margin: 0 3px;
          overflow: hidden;
          border-radius: 10px;
          img {
            float: left;
          }
        }
      }
    }
  }
  .more {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    margin-bottom: 10px;
    button {
      height: 40px;
      border-radius: 10px;
      padding: 0 20px;
      border: none;
    }
  }
}
</style>
<template>
  <div class="evaluate">
    <!-- 评价总数 =  好评 + 中评 + 差评 -->
    <h1 class="head">
      <span>
        评价组件
        <i>18万+</i>
      </span>
      <span>
        好评
        <i>98%</i>
      </span>
    </h1>
    <ul class="content" v-if="Object.keys(evaluate).length >0">
      <li
        v-for="(item,index) in showEvaluate"
        :key="index"
        v-on:click="$store.commit('ROUTERTO','/allevaluate/'+cDetailsId)"
      >
        <div class="title">
          <img :src="$store.state.urlPath+'/evaluate/'+item.headPortrait" alt />
          <span class="user">{{item.username}}</span>
          <span class="evaluateTime">{{item.time}}</span>
        </div>
        <div class="value">{{item.val}}</div>
        <div class="evaluateImg">
          <ul>
            <li v-for="(i,index) in item.evaluationImg" :key="index" v-on:click.stop="checkImg(i)">
              <img :src="$store.state.urlPath+'/evaluate/'+i" alt />
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="more">
      <button
        v-if="Object.keys(evaluate).length > 2"
        v-on:click="$store.commit('ROUTERTO','/allevaluate/'+cDetailsId)"
      >查看更多评价</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsEvaluate",
  props: {
    evaluate: {
      type: Object,
      default() {
        return {};
      },
    },
    cDetailsId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    //计算
    evaluateTime() {
      //评价时间是在数据库中获取到的
      let time = new Date();
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },
    showEvaluate() {
      let arr = [];
      console.log(this.evaluate);
      for (let i in this.evaluate) {
        if (i < 2) arr.push(this.evaluate[i]);
      }
      return arr;
    },
  },
  created() {
    //创建
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  mounted() {
    //渲染
  },
  methods: {
    //事件
    checkImg(img) {
      console.log(`你点击了图片<${img}>`);
    },
  },
  watch: {
    //监听
  },
};
</script>
