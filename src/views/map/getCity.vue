<template>
  <div class="getCity" id="getCity">
    cit页面
    <hr />
    {{lat}}-------------{{lng}}
    <hr />
    {{cityes}}
  </div>
</template>

<script type='script' lang='js'>
// import Vue from 'vue'
import AMap from 'AMap';
import { Map} from "common/utils";
export default {
  name: "getCity",
  data() {
    return {
        city:'getCity',
        lat:null,
        lng:null,
        cityes:null
    };
  },
  
  created() {
    //创建
    this.$root.$children[0].is_jd_TabBar = false
  },
  mounted() {
    this.getLocation()
    // this.showCityInfo()
    console.log(AMap)
  },
  methods: {
    //事件
    // 获取地理定位
    getLocation() {
      let _that = this
      let geolocation = Map.initMap('getCity'); //定位
      AMap.event.addListener(geolocation, "complete", result => {
        console.log(result);
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        console.log(this.lat,this.lng);
      })
    },
    // getAddress(lnglat){
    //     // var map = new AMap.Map(this.city, {
    //     //     resizeEnable: true
    //     // });
    //     var geocoder = new AMap.Geocoder({
    //         city: "010", //城市设为北京，默认：“全国”
    //         radius: 1000 //范围，默认：500
    //     })
    //     // var marker = new AMap.Marker()
    //     function regeoCode() {
    //         // map.add(marker)
    //         // marker.setPosition(lnglat)
    //         geocoder.getAddress(lnglat, function(status, result) {
    //             console.log(status);
    //             if (status === 'complete'&& result.regeocode) {
    //                 var address = result.regeocode.formattedAddress;
    //                 console.log(address);
    //             }else{
    //                 console.log('根据经纬度查询地址失败')
    //             }
    //         })
    //     }
    //     regeoCode();
    // }  
        // showCityInfo() {
        //     let _that = this
        //     //实例化城市查询类
        //     console.log(AMap.CitySearch)
        //     var citysearch = new AMap.CitySearch( );
        //     //自动获取用户IP，返回当前城市
        //     citysearch.getLocalCity(function(status, result) {
        //         if (status === 'complete' && result.info === 'OK') {
        //             if (result && result.city) {
        //                 _that.cityes = result.city;
        //                 console.log(result);
        //                 // var citybounds = result.bounds;
        //             }
        //         } else {
        //             console.log('城市获取失败'); 
        //         }
        //     });
        // }
        
    },
  components: {
    //组件
  },
  computed: {
    //计算
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  
  
};
</script>
<style scoped>
#getCity {
  height: 100vh;
}
</style>
