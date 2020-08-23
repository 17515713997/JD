<template>
  <div class="DetailsRotation">
    <banner :iscopy="false" divID='bannerBox' :isJump = 'true'>
      <div class="feature-item" v-for="(item,index) in dfeature" :key="index">
        <img :src="path+'/goods/'+item" alt />
      </div>
    </banner>
  </div>
</template>

<script>
//借用Feature 组件 渲染banner,样式效果基本一致
import { Feature } from "components/common/feature";
export default {
  name: "DetailsRotation",
  components: {
    //组件
    banner: Feature,
  },
  props: {
    dfeature: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      iscopy: false,
    };
  },
  methods: {
    featureAll() {
      this.$emit("cfeatureAll");
    },
  },
};
</script>
<style scoped>
.DetailsRotation{
    width: 100vw;
    overflow: hidden;
}
.feature-item {
  width: 100vw;
  /*不压缩空间*/
  flex-shrink: 0;
  flex-wrap: wrap;
}
.feature-item img {
  width: 100%;
  display: block;
}
</style>