<template>
  <div class="GoodsListItem">
    <div>
        <a href="javascript:;">
        <img :src="itemPath+'/jd_category/'+citem.c3_img" />
        <span>{{citem.c3_name}}</span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    citem: {
      type: Object,
      default() {
        return {};
      }
    },
    itemPath:{
        type:String,
        default:"http://106.12.85.17:8090/public/image"
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
