import {requestPost} from './request'

//购物车 进入 confirmOrder 创建订单 
export function create_order(data){
    //data在传递过来之前就需要定义好格式
    // console.log(data);
    return requestPost({
        url:'vuedemo/creat_order',
        data
    })
}

//details 进入confirmOrder  创建订单

export function create_details_order(data){
    return requestPost({
        url:'/vuedemo/buy_goods',
        data
    })
}

export function getOrderbyOrderId(data){
    //data在传递过来之前就需要定义好格式
    // console.log(data);
    return requestPost({
        url:'vuedemo/get_goods_inorder',
        data:{
            order_id:data
        }
    })
}