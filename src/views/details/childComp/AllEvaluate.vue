<style lang="less" scoped>
.home-nav-bar{
  border-bottom:1px solid #ccc;
}
.quan{
  width:100%;
    float: left;
  li{
    width:23%;
    float: left;
    height:30px;
    margin-top:10px;
    line-height: 30px;
    color: #f2270c;
    border: 1px solid #f2270c;
    margin-left:5px;
    border-radius: 20px;
    background: #fcedeb;
  }
}
#AllEvaluate{
  ul{
    float: left;
    width: 100%;
    padding:20px  0;
    li{
      float: left;
    }
  }
}
</style>
<template>
  <div style="padding:0 10px">
    <nav-bar class="home-nav-bar">
      <div slot="left" @click="back">&lt;</div>
      <div slot="center">
       商品评价
      </div>
      <div slot="right">...</div>
    </nav-bar>
    <ul class="quan">
      <li>全部</li>
      <li>最新</li>
      <li>好评</li>
      <li>中评</li>
      <li>差评</li>
      <li>视频晒单</li>
      <li>有图</li>
      <li>感觉舒适</li>
      <li>皮质柔软</li>
      <li>软硬适中</li>
      <li>毫不变形</li>
      <li>颜色漂亮</li>
    </ul>
    <p  style="padding-top: 20px;
    float: left;
    width: 100%;
    background: #f7f7f7;
    margin-top: 30px;"></p>
    <div id='AllEvaluate' v-for="(item,index) in allEvaluate"  :key="index">
      <ul>
        <li style="text-align: left;width:35%">
          <!-- <img src="" alt="图"> -->
           <img :src="path+item.headImg" alt="" style="float: left;">
          <span style="float: left;
    height: 40px;
    display: block;line-height: 40px">{{item.username}}</span>
        </li>
        <li style="text-align: left;width:10%;line-height: 40px;line-height: 40px">{{item.Highpraise}}</li>
        <li style="text-align: right;width:55%;line-height: 40px;line-height: 40px">{{item.evaluationTime}}</li>
      </ul>
      <div>
        {{item.evaluationDetails}}
        <!-- <img :src="path+item.evaluationImg" alt=""> -->
      </div>
      <ul style="color: #999;font-size:12px;">
        <li style="padding-right:5px;">{{item.evaluationNorm}}:</li>
        <li>{{item.evaluationShop}}</li>
        <!-- <li style="padding-right:5px;">1:</li>
        <li>2</li> -->
        <li  style="padding-right:5px;">{{item.evaluationModel}}:</li>
        <li>{{item.model}}</li>
        <li style="width: 65%;
    text-align: right;color:blue" @click="hui">回复</li>
      </ul>
    </div>
    <details-tab-bar></details-tab-bar>
  </div>
</template>

<script>
import  DetailsTabBar  from  "views/details/childComp/DetailsTabBar" 
// import TabBar  from 'components/common/tabbar/TabBar'
// import TabBarItem  from 'components/common/tabbar/TabBarItem'
import NavBar from "components/common/navbar/NavBar";
import {getAllEvaluate } from "network/details";
export default {
  name: 'AllEvaluate',
  data(){
    return {
        path: "http://106.12.85.17:8090/public/image/evaluate/",
        allEvaluate:[]
    }
  },
  components: {//组件
  NavBar,
  DetailsTabBar
  // TabBar,TabBarItem
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
   back() {
      this.$router.go(-1);
      // window.history.go(-1)
      // console.log(document.referrer);
    },
    hui(){
      alert("到回复页面")
    }
  },
  watch: {//监听
  },
}
</script>
