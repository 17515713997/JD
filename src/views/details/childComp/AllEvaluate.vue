<style lang="less" scoped>
</style>
<template>
  <div id='AllEvaluate'>
      {{allEvaluate}}
  </div>
</template>

<script>
import {getAllEvaluate } from "network/details";
export default {
  name: 'AllEvaluate',
  data(){
    return {
        allEvaluate:[]
    }
  },
  components: {//组件
  },
  computed: {//计算
  },
  created(){//创建

    console.log(this.$route);
    console.log(this.$route.params.id);
    if(this.$route.params.id){ 
        getAllEvaluate(this.$route.params.id).then(res=>{
            if(res.code != 200) return console.log('没取到值');
            this.allEvaluate = res.data
        })
    }
  },
  activated(){//激活
  },
  deactivated(){//未激活
  },
  mounted(){//渲染
  },
  methods: {//事件
  },
  watch: {//监听
  },
}
</script>
