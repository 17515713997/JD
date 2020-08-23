<template>
    <!-- 用于关联feature组件 -->
    <feature divID="HomeFeature" :iscopy="iscopy">
        <feature-item v-for="(item,index) in cfeature" :key="index">
            <li v-for="i in item" :key="i.id">
                <a :href="i.Imghref">
                    <img :src="path+i.imgsrc" alt="">
                    <span>{{i.Title}}</span>
                </a>
            </li>
            <li v-if=" index == cfeature.length - 1  && cfeature.length%10 != 0" v-on:click="featureAll()">
                <img :src="path+'20.png'" alt="">
                <span>全部</span>
            </li>
        </feature-item>
    </feature>
</template>

<script>
import {Feature,FeatureItem} from 'components/common/feature'
export default {
    name:"HomeFeature",
    props:{
        cfeature:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            path:"http://106.12.85.17:8090/public/image/feature/",
            iscopy:false
        }
    },
    mounted(){
        // console.log(this.cfeature);
    },
    components:{
        Feature,
        FeatureItem
    },
    methods:{
        featureAll(){
            this.$emit('cfeatureAll')
        }
    }
}
</script>

<style scoped>

</style>