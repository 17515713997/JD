
<style lang="less" scoped>
#Registered{
    h2{
        margin-bottom:20px;
    }
    input{
        width:96%;
        margin:10px 2%;
        height:50px;
        font-size:20px;
        border-radius: 25px;
        border:none;
        outline: none;
    }
}
</style>
<template>
  <div id='Registered'>
      <h2>该手机号已经绑定以上京东账号，请确认是你的账号</h2>

      <input type="text" value='是我的，立即登录' > 
        <input type="text" value='不是我的，继续注册'>
  </div>
</template>

<script>
export default {
  name: 'Registered',
  data(){
    return {}
  },
  components: {//组件
  },
  computed: {//计算
  },
  created(){//创建
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
