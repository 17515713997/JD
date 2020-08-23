<template>
    <div class="slide">
        <!-- 只留出一个插槽的位置,提供给后边使用 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"Slide"
}
</script>

<style scoped>
    .slide{
        width:100%;
        /* flex-shrink 默认值是1  
        当父元素x轴方向空间不足时  
        子元素之和 > 父元素宽度
        可以按照flex-shrink 分配的值,按比例缩小子元素
        缩小的值是超出部分的值的计算值
        设置为0,不让元素去做空间压缩
        */
        flex-shrink:0;
    }
    .slide img{
        width: 100%;
    }
</style>