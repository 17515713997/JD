<template>
  <div :id="featureControlId" class="tabControl">
    <div>
      <slot></slot>
    </div>
    <div
      v-for="(item,index) in titleArr"
      :key="index"
      @click="itemClick(item.c1_id)"
      :class="{active:itemIndex == item.c1_id}"
    >
      <span>{{item.c1_name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    featureControlId: {
      type: String,
      default: "tabControl",
    },
    titleArr: {
      type: Array,
      default() {
        return [];
      },
    },
    direction: {
      //排列的方向
      type: String,
      default: "transverse", //纵向portrait  横向transverse
    },
  },
  data() {
    return {
      itemIndex: 0,
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(index) {
      //在子组件中如果想使用父组件传递过来的事件，需要通过使用$emit
      this.$emit("tabClick", index);
      // $parent 直接使用父组件的事件(只能找到上一个父元素)
      //   this.$parent.tabControlClick(index);
      this.itemIndex = index;
      console.log(index);
    },
  },
};
</script>
<style lang='less' scoped>
// 如是想要使用less 建议 去 vue ui视图界面中添加
.tabControl {
  width: 100%;
  font-size: 12px;
  line-height: 40px;
}
.tabControl div {
  border-bottom: 1px solid #555555;
  height: 40px;
}
.active {
  color: red;
  background-color: #fff;
}
</style>

