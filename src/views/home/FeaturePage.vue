<template>
  <div class='FeaturePage'>
      {{featureAll}}
  </div>
</template>

<script>
import {getFeature} from "network/home";
export default {
  name: 'FeaturePage',
  data(){
    return {
        featureAll:[]
    }
  },
  components: {//组件
  },
  computed: {//计算
  },
  created(){//创建
    this.getFeature(0);
  },
  activated(){//激活
  },
  deactivated(){//未激活
  },
  mounted(){//渲染
    console.log(this.featureAll);
  },
  methods: {//事件
    getFeature() {
      getFeature().then((res) => {
        this.featureAll = [...res.data]
        console.log(res);
      });
    }
  },
  watch: {//监听
  }
}
</script>
<style scoped>
</style>
