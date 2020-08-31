<template>
  <div class='gengduo'>
       <scroll class="scroll">
            <nav-bar>
                <div slot="left" @click="$router.go(-1)">
                <i class="el-icon-arrow-left"></i>
                </div>
                <div slot="center">更多评价</div>
            </nav-bar>
            <ul>
                <li v-for="i in [1,2,3,4,5,6,7,8,9,10]" :key="i" style="padding-top:20px;">
                    <div class="title">
                    <span class="user">用户头像+名称</span>
                    </div>
                    <div class="value">评价内容</div>
                    <div>评价图片</div>
                </li>
            </ul>
        </scroll>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: 'gengduo',
  data(){
    return {}
  },
  components: {
      NavBar,
      Scroll,
  },
  computed: {},
  created(){},
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {},
  watch: {}
}
</script>
<style  scoped>
</style>
