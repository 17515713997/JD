<style lang='less' scoped>
.goods {
  background-color: #fff;
  padding: 5px 10px;
  text-align: left;
  line-height: 22px;
  > div {
    // border-bottom: 5px solid red;
    margin-bottom: 10px;
  }
  .info-price {
    margin-top: 20px;
    display: flex;
    position: relative;
    .price {
      flex: 1;
      display: flex;
      .n-price {
        color: red;
        font-size: 16px;
        span {
          font-size: 30px;
          margin-left:-3px;
        }
      }
      .o-price {
        margin-left: 15px;
        padding-top: 5px;
        text-decoration: line-through;
        color: rgb(170, 170, 170);
        font-size: 14px;
        span {
          font-size: 20px;
        }
      }
    }
    .other {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      span {
        margin-right:5px;
        i.el-icon-s-finance {
          display: block;
          margin-left: 18px;
        }
        i.el-icon-sell {
          display: block;
          margin-left: 8px;
        }
      }
    }
  }
  .info-title {
    font-size: 18px;
    font-weight: bold;
    span {
      background-color: red;
      color: #fff;
      font-size: 12px;
      padding: 2px 6px;
      font-weight: normal;
      border-radius: 7px;
    }
  }
}
</style>
<template>
  <div class="goods" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-price">
      <div class="price">
        <div class="n-price">
          ￥<span>{{goodsInfo.newPrice | changePrice}}</span>
        </div>
        <div class="o-price" v-if="goodsInfo.oldPrice != ''">
          ￥<span>{{goodsInfo.oldPrice | changePrice}}</span>
        </div>
      </div>
      <div class="other">
        <span>
          <i class="el-icon-s-finance"></i>
          降价提醒
        </span>
        <span>
          <i class="el-icon-sell"></i>
          收藏
        </span>
      </div>
    </div>

    <div class="info-title">
      <span
        v-if="goodsInfo.category == '自营'"
        style="background-color:red;color:#fff"
      >{{goodsInfo.category}}</span>
      {{goodsInfo.title}}
    </div>
    <div>
      巴拉巴拉：
      <span v-for="(item,index) in goodsInfo.imgList" :key="index">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  components: {
    //组件
  },
  computed: {
    //计算
  },
  created() {
    //创建
    console.log(this.goodsInfo);
  },
  methods: {
    //事件
  },
  filters: {
    changePrice(val) {
      return Number(val).toFixed(2);
    },
  },
};
</script>

