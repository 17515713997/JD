import { requestPost } from './request'
export function postShopCart(data = "") {
    console.log(data);
    //post 请求数据的时候，提交数据用data
    return requestPost({
        url: '/vuedemo/get_shopcart',
        data:{
            'user_id':data
        }
    })
}
export function UpdataShopCart(data) {
    return requestPost({
        url: '/vuedemo/update_shopcart',
        data
    })
}