import { request } from './request'

//用于详情页面 根据商品id请求出当前商品的数据，以及商品规格数据，以及发布商品的店铺信息数据
export function getGoodsId(id){
    return request({
        url:"/vuedemo/get_goodsDet",
        params:{ //get请求数据的时候，提交数据用params/query
            goods_id:id
        }
    })
}

export function getAllEvaluate(id){
    return request({
        url:"/vuedemo/get_goods_sevaluate",
        params:{ //get请求数据的时候，提交数据用params/query
            goods_id:id
        }
    })
}