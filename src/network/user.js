//不论登录 还是注册，都是跟用户有关系的。。
import {requestPost,request} from './request';

// params  get请求使用params  或者 query 
// post 请求使用 data 上传数据 

//手机注册
export function register(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/register",
        data
    })
}

//登录
export function land(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/land",
        data
    })
}

//自动登录
export function autoLand(data){
    // console.log(data);
    return requestPost({
        url:"/vuedemo/autoland",
        data
    })
}

//验证手机号  get请求
export function regPhone(params){
    return request({
        url:"/vuedemo/land_have_telphone",
        params
    })
}

//获取手机验证码
export function getCodeImg(params){
    return request({
        url:'/vuedemo/get_code_img',
        params
    })
}


//获取国际区号

export function get_mobile_prefix(){
    return request({
        url:"/vuedemo/get_mobile_prefix"
    })
}


// 正常应该使用post
export function regPhone1(data){
    return requestPost({
        url:"/vuedemo/land_have_telphone",
        data
    })
}
