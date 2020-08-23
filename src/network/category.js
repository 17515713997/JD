import { request } from './request'
//导出1级分类
export function get_jd_category_one() {
    return request({
        url: "/vuedemo/get_jd_category_one",
    })
}
//导出2级分类
export function get_jd_category_two() {
    return request({
        url: "/vuedemo/get_jd_category_two",
    })
}
//导出3级分类
export function get_jd_category_three() {
    return request({
        url: "/vuedemo/get_jd_category_three",
        params: {
            // c1_id:1,
            // c2_id:1,
            // c3_name:'老人机',
            // page: 1,
            // pagesize: 500
            // page:1,
            // pagesize:500
        }
    })
}