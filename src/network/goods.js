import { request } from './request'

//实例：
// export function getgoods(data) {
//     //data处理
//     return request({
//         url: "/vuedemo/get_goods",
//         // params:{...data},
//         params: {
//             like:"电脑",//模糊查询
//             order:{//排序, 先以id降序，在以DtoU升序
//                c2_id:'UtoD',
//                money_now:'DtoU'     //'DtoU'升序  'UtoD' 降序
//             },
//             minMoney:0,  //最低价格
//             maxMoney:0,     //最高价格
//             exact:{//精确查找
//                 id:1,
//                 c1_id:2
//             },
//             page:1,//默认第一页
//             pageSize:50, //默认值
//         }
//     })
// }
//用于搜索数据。关键字查数据等
export function getGoods(data) {
    return request({
        url: "/vuedemo/get_goods",
        params:{...data}
    })
}

//用于详情页面 根据商品id请求出当前商品的数据，以及商品规格数据，以及发布商品的店铺信息数据
export function getGoodsId(id){
    return request({
        url:"/vuedemo/get_goodsDet",
        params:{ //get请求数据的时候，提交数据用params/query
            goods_id:id
        }
    })
}