// 配送地址
import { request } from "./request"

//获取省份
export function getProvinces(){
    return request({
        url:'/vuedemo/get_provinces',
    })
}
//获取市
export function getCities(params){
    return request({
        url:'/vuedemo/get_cities',
        params
    })
}
//获取县/区
export function getAreas(params){
    console.log(params)
    return request({
        url:'/vuedemo/get_areas',
        params
    })
}

//新增地址
    
export function creat_user_address(params){
    console.log(params)
    return request({
        url:'/vuedemo/creat_user_address',
        params
    })
}
//修改地址
export function update_user_address(params){
    console.log(params)
    return request({
        url:'/vuedemo/update_user_address',
        params
        // params:{

        // }
    })
}
//删除地址
export function delete_user_address(params){
    console.log(params)
    return request({
        url:'/vuedemo/delete_user_address',
        params
    })
}
//查询

export function get_user_address(params){
    console.log(params)
    return request({
        url:'/vuedemo/get_user_address',
        params
    })
}
