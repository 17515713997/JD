<template>
  <ul class="feature-item">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "FeatureItem",
};
</script>

<style lang='less' scoped>
/* 写ul 和li 的样式 */
.feature-item {
  width: 100vw;
  /*不压缩空间*/
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
}
.feature-item li {
  width: 20vw;
  font-size: 12px;
  margin: 5px 0;
}
.feature-item li a {
  text-decoration: none;
  color: darkgray;
}
.feature-item li img {
  width: 60%;
  display: block;
  margin-left: 20%;
}
div.el-tabs__header {
  margin: 0 !important;
  flex: 1;
}
</style>







