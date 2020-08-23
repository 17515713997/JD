import { request } from './request'
export function getJxBanner() {
    return request({
        url: '/vuedemo/banner'
    })
}

//导出一个获取功能视图的 访问
export function getJxFeature() {
    return request({
        url: "/vuedemo/jx_feature",
        params: {
            show: 1
        }
    })
}
