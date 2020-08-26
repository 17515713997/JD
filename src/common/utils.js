//防抖函数
export function debounce(func,delay){
    let timer = null 
    return function (...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{    
            func.apply(this,args)
        },delay)
    }
}

export function goodsInfo(goods,store){
    this.oldPrice = goods.money_old
    this.newPrice = goods.money_new
    this.title = goods.name
    this.goodId = goods.id
    this.caregory = store.shopName == "JD" || store.shopName == "jd" ? true : false
}

export function shopInfo(store){
    this.shopName = store.shopName
    this.cGoods = store.cGoods
    this.shopLogo = store.shopLogo
    this.shopId = store.id
    this.caregory = store.shopName == "JD" || store.shopName == "jd" ? true : false //分类 true 为京东自营 false为个体经营
}

