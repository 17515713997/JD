<template>
  <div id="tab-bar" >
    <slot>用来插入bar-item</slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:white;
}

</style>
