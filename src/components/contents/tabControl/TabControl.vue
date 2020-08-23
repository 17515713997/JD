<template>
  <div :id="controlId" ref="tabControl" class='tabControl'>
    <div
      v-for="(item,index) in titleArr"
      :key="index"
      @click="itemClick(index)"
      :class="{active:itemIndex == index}"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    controlId: {
      type: String,
      default: "tabControl"
    },
    titleArr: {
      type: Array,
      default() {
        return [];
      }
    },
    direction: {
      //排列的方向
      type: String,
      default: "transverse" //纵向portrait  横向transverse
    },
    column:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      itemIndex: 0
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.handleDom()
  },
  methods: {
    handleDom(){
      // let tabControl =this.$refs.tabControl;
      let tabControl = document.querySelector(`#${this.controlId}`);
      console.log(tabControl);
      let parentWidth = tabControl.offsetWidth;
      console.log(parentWidth);
      let divItem = tabControl.querySelectorAll('div')
      console.log(divItem);
      divItem.forEach(item=>{
        item.style.width= parentWidth/this.column-20+"px"
      })
    },
    itemClick(index) {
      //在子组件中如果想使用父组件传递过来的事件，需要通过使用$emit
        this.$emit('tabClick',index)
      // $parent 直接使用父组件的事件(只能找到上一个父元素)
      //   this.$parent.tabControlClick(index);
      this.itemIndex = index;
      console.log(index);
    }
  }
};
</script>
<style lang='less' scoped>
// 如是想要使用less 建议 去 vue ui视图界面中添加
.tabControl {
  width: 98vw;
  font-size: 12px;
  line-height: 40px;
  padding:0 1vw;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color:white;
}
.tabControl div {
  border-bottom: 1px solid #555555;
  border-top: 1px solid #555555;
  height: 40px;
  border-radius:20px;
}
.active {
  color: red;
  background-color:#fff;
}
</style>

