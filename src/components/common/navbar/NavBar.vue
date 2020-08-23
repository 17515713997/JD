<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <!-- <div class='left'><slot name='left'></slot></div> -->
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    // parentLeft() {
    //   console.log("哈哈");
    //   this.$emit("leftBarClick");
    // },
  },
};
</script>

<style  scope>
.navbar {
  /*css3 看下display*/
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  /* box-shadow: 0 1px 1px rgba(100,100,100,.2); */
}
.left,
.right {
  width: 15vw;
}
.center {
  flex: 1;
  /* background-color:red */
}
</style>