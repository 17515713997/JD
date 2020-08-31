//防抖函数
export function debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 从商品详情中取出 有用的数据
export class GoodsInfo {
    constructor(goods, store) {
        this.oldPrice = goods.money_old
        this.newPrice = goods.money_now
        this.title = goods.name
        this.goodId = goods.id
        this.caregory = store.category
    }
}
//从店铺中取出有用的数据
export class ShopInfo {
    constructor(store) {
        this.shopName = store.shopName  //店铺名
        this.cGoods = store.cGoods      //店铺商品数量
        this.shopLogo = store.shopLogo  //店铺的logo
        this.shopId = store.id          //店铺的id
        this.caregory = store.category  //分类 true 为京东自营 false为个体经营
        this['收藏字段'] = '收藏的店铺A的id,收藏的店铺B的id,收藏的店铺C的id,收藏的店铺D的id'
    }
}

// 从规格或者 关联数据中取出数据
export class SelectNorm {
    constructor(norm, relation) {
        if (norm.length > 0) {
            console.log(norm);
        }
        if (relation.length > 0) {
            let name = relation[0].relation_name
            this[name] = [...relation]
        }
    }
}


// export function 



// norm   不跳转
// 关联   直接跳转

// norm————不跳转  + 关联———— 跳转 

// norm +  关联    组合跳转