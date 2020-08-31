import axios from 'axios'
//get请求
export function request(config){
    axios.defaults.timeout = 5000
    const instance = new axios.create({
        baseURL:"http://106.12.85.17:8090",
        method:'get',
        
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //.....
        // console.log(config);
        return config
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        //....
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    return instance(config)
}

//post 请求
export function requestPost(config){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    const instance = new axios.create({
        baseURL:"http://106.12.85.17:8090",
        method: 'post'
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //.....
        // console.log(config);
        return config
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //....
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    return instance(config)
}

//ip 请求
export function requestIp(config){
    
    const instance = new axios.create({
        baseURL:"api/cityjson?ie=utf-8",
        method: 'post'
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        //.....
        // console.log(config);
        return config
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //....
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    return instance(config)
}