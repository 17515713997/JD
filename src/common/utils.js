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

//从商品详情中取出跟商品有关的数据 ----->detailsbaseinfo

// export function GoodsInfo(goods, shops) {  //es5  创建构造函数
//     this.oldPrice = goods.money_old     //取旧价格
//     this.newPrice = goods.money_now     //取新价格
//     this.title = goods.name             //取名字     
//     this.goodsId = goods.id             //取id
//     this.caryfory = shops.cartgory      //取分类
// }

export class GoodsInfo { //es6 类
    constructor(goods, shops) { // 构造器
        this.oldPrice = goods.money_old     //取旧价格
        this.newPrice = goods.money_now     //取新价格
        this.title = goods.name             //取名字     
        this.goodsId = goods.id             //取id
        this.category = shops.category      //取分类
        this.img_cover = shops.img_cover
        //其他。。。
        //其他的属性
    }
}

//从店铺中取出有用的数据

export class ShopInfo {
    constructor(shops) {
        this.shopName = shops.shopName
        this.cGoods = shops.cGoods
        this.shopLogo = shops.shopLogo
        this.shopsId = shops.id
        this.category = shops.category
        this.collection = '5000'           //被收藏的次数
    }
}

//从规格 和关联数据中取数据

export class SelectNorm {
    constructor(norm, relation) {
        if (norm.length > 0) {
            this.norm = {}
            for (let i = 0; i < norm.length; i++) {
                if (!this.norm[norm[i].ggname]) {
                    this.norm[norm[i].ggname] = []
                }
                this.norm[norm[i].ggname].push(norm[i])
            }
        }
        if (relation.length > 0) {
            this.relation = {}
            for (let i = 0; i < relation.length; i++) {
                if (!this.relation[relation[i].relation_name]) {
                    this.relation[relation[i].relation_name] = []
                }
                this.relation[relation[i].relation_name].push(relation[i])
            }
        }
    }
}

// 获取评价

export class Evaluate {
    constructor(evaluate) {
        for (let i = 0; i < evaluate.length; i++) {
            this[i] = {};
            //用户名
            if (evaluate[i].anonymous == 1) {
                let arr = evaluate[i].username.split('') // z h a n g y a g e
                let name = ""
                for (let j = 0; j < arr.length; j++) {
                    if (j > 0 && j < arr.length - 1)
                        name += '*'
                    else name += arr[j]
                }
                this[i].username = name
            } else {
                this[i].username = evaluate[i].username
            }
            //头像
            this[i].headPortrait = evaluate[i].headImg;
            //图片
            let imgArr = evaluate[i].evaluationImg.split(',')
            // this[i].evaluationImg = imgArr.concat(imgArr,imgArr,imgArr,imgArr);
            this[i].evaluationImg = imgArr;
            //时间
            let time = new Date(evaluate[i].evaluationTime);
            this[i].time = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
            //评价
            this[i].val = evaluate[i].additional;
            //好评度
            this[i].highpraise = evaluate[i].Highpraise;
        }
    }
}



//获取details提交到确认订单页面的数据 ---- 可以修改的值不在此处获取 例如   num  norm  addr
export class orderConfirmData {
    constructor(goods,shops) {
        //商品id
        this.goods_id =  goods.id
        //商品名
        this.goods_name =  goods.name
        //商品热搜关键字
        this.hot_keyword =  goods.hot_keyword
        //商品展示图
        this.img_cover =  goods.img_cover
        //新价格
        this.money_now =  goods.money_now
        //原价格
        this.money_old =  goods.money_old
        //店铺id
        this.shop_id =  shops.id
        //店铺名
        this.shop_name =  shops.shopName
    }
}








//定义评价的 class类