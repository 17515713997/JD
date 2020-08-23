import { request } from './request'
export function getTabBar(path) {
    return request({
        url: '/vuedemo'+path
    })
}

