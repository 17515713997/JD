<template>
  <div :id="divID">
    <!-- 放图片 -->
    <div class="rotation" @touchstart = "touchStart" @touchend = "touchEnd" @touchmove = "touchMove">
        <slot></slot>
    </div>
    <!-- 左右按钮 如果需要的时候，给插槽内放置左右按钮即可-->
    <div class="icator" v-if="showIcator && slideCount>1">
      <slot name="icator"></slot>
    </div>
    <!-- 放小圆点  索引指示器-->
    <div class="indicator" v-if="showIndicator && slideCount>1">
        <!-- 可以放置index索引小圆点图标，  也可以插入一个按钮，用于播放视频 -->
        <slot name="indicator">
            <div v-for="(item,index) in slideCount" :key="index" class="round-item" :class="{active:index === currentIndex - 1}">
            </div>
        </slot>
    </div>
    <div>
        <slot name='num'>
            <!-- 显示图片数量  1/6 -->
        </slot>
    </div>
  </div>
</template>
<script>
// 轮播图的实际操作事件,要在当前的rotation组件中创建
export default {
    name: "Rotation",
    //因为我们时封装了一个轮播图,有些特定的值,可能需要修改,所以我们需要动态的设定
    props:{
        interval:{
            type:Number,
            default:3000,//轮播动画的时间,假设每3秒1次
        },
        moveBase:{
            type:Number,
            default:0.3,//移动基数 
        },
        animateDuration:{
            type:Number,
            default:500,//定义动画时间为300毫秒
        },
        showIndicator:{//小圆点是否显示
            type:Boolean,
            default:true, //
        },
        showIcator:{//定义左右箭头是否显示
            type:Boolean,
            default:false, //
        },
        divID:{
            type:String,
            default:"divID"
        }
    },
    data(){
        return {
            slideCount:0,//轮播图片的个数
            totalWidth:0,//滚动的宽度
            currentIndex:1,//当前的图片下标
            rotationStyle:{},//因为要存储的是transform 有兼容问题,所以需要存多个
            scrolling:false,//轮播图是否在滚动
            playTimer:null,//接收定时器,用于定时器关闭
            startX:0,//拖拽的其实坐标点
            currentX:0,//记录移动的坐标点
            distance:0,//记录两点的距离
        }
    },
    mounted(){//页面渲染结束  挂载页面
        //在挂载页面后0.5执行函数  
        setTimeout(()=>{
            //设置dom属性
            this.handleDom(this.divID)
            //执行轮播定时器,轮播开始
            this.startTimer()
        },500)
    },
    methods:{
        //操作DOM
        handleDom(id){
            //获取页面的盒子元素。设置css样式
            let divId = document.querySelector(`#${id}`)
            divId.style.overflow='hidden';
            divId.style.position='relative';
            //获取页面的rotation 元素
            //只能获取页面的第一个.rotation对象
            let rotationEl = document.querySelector(`#${id} .rotation`)
            //获取页面的slide元素
            let slideEls = rotationEl.querySelectorAll(".slide")
            // console.log(rotationEl);
            // console.log(slideEls)
            //保存个数
            this.slideCount = slideEls.length
            //如果图片的数量>1 则操作图片
            if( this.slideCount >1 ){
                //克隆第一张图
                //克隆方法忘了 ----->原生js----->DOM操作
                let cloneFirst = slideEls[0].cloneNode(true)
                //克隆最后一张图
                let cloneLast = slideEls[slideEls.length - 1].cloneNode(true)
                //吧克隆的第一张图插入图片的末尾  appendChild
                rotationEl.appendChild(cloneFirst)
                //把恐龙的最后一张图插入到图片的最前端  insertBefore  在什么之前插入什么
                rotationEl.insertBefore(cloneLast,slideEls[0])
                //获取滚动的宽度
                this.totalWidth = rotationEl.offsetWidth
                // 对象赋值  两个对象用了同一个地址
                this.rotationStyle = rotationEl.style
                // console.log(this.totalWidth);
            }
            this.setTransform(-this.totalWidth)
        },
        //设置图片滚动的位置   相当于定义样式 ,图片的每次移动都需要样式的执行,把样式存储在data数据中
        setTransform(position){
            // console.log(position);//-736
            // console.log('${position}');//${position}
            // console.log(`${position}`);//-736
            // this.rotationStyle.transform = 'translateX('+position+'px)'
            // this.rotationStyle['-webkit-transform'] = 'translateX('+position+'px)'
            // this.rotationStyle['-ms-transform'] = 'translateX('+position+'px)'
            this.rotationStyle.transform = `translateX(${position}px)`
            this.rotationStyle['-webkit-transform'] = `translateX(${position}px)`
            this.rotationStyle['-ms-transform'] = `translateX(${position}px)`
            // console.log(this.rotationStyle)
        },
        //设置轮播开始定时器
        startTimer(){
            this.playTimer = setInterval(()=>{
                this.currentIndex++
                this.scrollPosition(-this.currentIndex * this.totalWidth)
            },this.interval)
        },
        //移动正确位置
        scrollPosition(currenPosition){
            this.scrolling = true
            this.rotationStyle.transition = 'transform '+this.animateDuration+'ms'
            this.setTransform(currenPosition) 
            this.checkPosition()
            this.scrolling = false
        },
        stopTimer(){
            // console.log("停止定时器")
            clearInterval(this.playTimer)
        },
        //判断当前图片的位置(校正位置)
        checkPosition(){
            setTimeout(()=>{
                //把动画时间设置为0,瞬间转换图片
                this.rotationStyle.transition = '0ms'
                if(this.currentIndex >= this.slideCount + 1){
                    this.currentIndex = 1
                    this.setTransform(-this.currentIndex * this.totalWidth) 
                }else if(this.currentIndex <= 0 ){
                    this.currentIndex = this.slideCount
                    this.setTransform(-this.currentIndex * this.totalWidth) 
                }
            },this.animateDuration)
        },
        //拖拽事件    
        //在拖拽轮播图的时候,当当前轮播正在执行移动时,时不允许拖拽的,所以在轮播动画执行时,需要禁止拖拽
        //开始推拽
        touchStart(e){
            if(this.scrolling) return 
            //获取用户拖拽按下点的x坐标
            this.startX = e.touches[0].pageX
            // console.log(this.startX )
            //停止定时器
            this.stopTimer()
        },
        touchMove(e){
            this.currentX = e.touches[0].pageX
            //获取移动前和移动后的距离差
            this.distance = this.currentX - this.startX
            //   this.distance =     402 - 433.3333435058594
            // console.log(this.currentX);
            //获取以下在手动移动前的 图片位置
            let currenPosition = -this.currentIndex * this.totalWidth;
            // console.log(currenPosition);  //-736
            //获取 已经移动的距离
            let moveDistance = this.distance + currenPosition
            // console.log(moveDistance); //-767.3333435058594

            //把当前移动后的值 设置给setTransform 
            this.setTransform(moveDistance)
            //当设置结束后,停止移动时,执行下一步的过度
        },
        touchEnd(){
            //获取移动的距离   取正数
            let currentMove = Math.abs(this.distance)  

            //判断最终的距离   
            if(this.distance == 0){
                return 
            }else if(this.distance > 0 && currentMove > this.totalWidth  * this.moveBase){
                // currentMove > this.totalWidth  * this.moveBase  已经移动的值 > 移动基数值 才能移动

                 //当结束点 - 起始点  > 0  则 向右移动 图片--  
                 this.currentIndex--  
            }else if(this.distance < 0 && currentMove > this.totalWidth  * this.moveBase){
                //当结束点 - 起始点  < 0  则 向左移动 图片++ 
                this.currentIndex++
            }
            
            //移动到正确的位置
            this.scrollPosition(-this.currentIndex * this.totalWidth)
            //开启定时器
            // console.log("开启定时器");
            this.startTimer()
        }
    }
}
</script>
<style scoped>
    .rotation{
        display: flex;
    }
    .indicator{
        display:flex;
        position:absolute;
        justify-content: center;
        width:100%;
        /* background-color:black; */
        bottom:20px;
    }
    .round-item{
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background:#fff;
        line-height:10px;
        font-size:10px;
        color:red;
        margin:0 5px;
    }
    .round-item.active{
        background-color:red;
    }
</style>