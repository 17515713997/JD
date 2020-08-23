<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true, //
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // console.log(this.scroll);
    if (this.probeType == 2 || this.probeType == 3) {
      // console.log("被执行");
      this.scroll.on("scroll", position => {
        // console.log(position);
        //调用以下父组件中绑定的事件，并传递参数
        this.$emit("parentScroll", position);
      });
    }
    //当父组件允许加载更多时，才能监听滚动条是否滚动到页面底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("滚动到页面底部了");
        this.$emit("pullingUp");
      });
    }
    // console.log(this.scroll);
  },
  methods: {
    //注意：在组件内定义方法时，尽量不使用其他插件中已经很定义好的方法名，容易冲突
    //定义跳转页面指定位置事件
    scrollTo1(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refreshScroll() {
      //代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    finishpullup() {
      this.scroll && this.scroll.finishPullUp();
    }
  }
};
</script>
<style scoped>
</style>
