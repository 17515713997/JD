// 解构赋值一个常量
import * as types from "./mutation-types"
export default {
    getShopCart(contents,payload){
        console.log(payload);
        // this.$store.commit("方法",参数)
        //contents 相当与 $store   使用commit
        //调用vuex的mutations中的 types.POST_SHOPCART 方法
        contents.commit(types.POST_SHOPCART,payload)
    },
    autocode(contents,payload){
        return contents.commit(types.AOTU_CODE,payload)    
    }
}