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
