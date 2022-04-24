import requests from './request'
//这里的requests是axios实例
import mockRequests from './mockAjax'
// 对接口进行统一管理，这个接口是用来干什么的，供谁使用
// 暴露接口
// 三级联动的接口 /product/getBaseCategoryList
// export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqCategoryList = () => {
    console.log("调用了请求")
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
export const reqBannerList = () => {
    return mockRequests({ url: '/banner', method: 'get' })
}

export const reqFloorList = () => {
    return mockRequests({ url: '/floors', method: 'get' }) //注意路径名一定要小写
}

export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method:"post",
    data:params // 为什么不能用query参数？？
     })

export const reqGoodsDetailInfo = (skuid) => {return requests({ url:`/item/${skuid}`, method: 'get' })}
//添加数据到购物车中获取更新一个产品的个数
export const reqAddOrUpdateShopCart=(skuId,skuNumber)=>{return requests({
    url:`/cart/addToCart/${skuId}/${skuNumber}`,
    method:"post"
})}    
export const reqCartList= () => {return requests({ url:'/cart/cartList', method: 'get'})}
//删除
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
//切换商品选择状态
// /api/cart/checkCart/{skuID}/{isChecked} skuID	string	Y	商品ID
// isChecked	string	Y	商品选中状态
// 0代表取消选中
// 1代表选中
export const reqChangeChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
// 验证码请求接口 user/passport/sendCode/{phone}   method：get
export const reqGetcode = (phoneNumber)=>requests({url:`/user/passport/sendCode/${phoneNumber}`,method:'GET'})
// 注册用户
export const reqRegisterUser = (data)=>requests({url:"/user/passport/register",data,method:'post'})
// 用户登录
export const reqLogin=(data)=>requests({url:`/user/passport/login`,data,method:"post"})

//home首页用户带token登录获取用户信息
export const reqUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:"get"})

// 退出登录
export const reqUserLogout=()=>requests({url:"/user/passport/logout",method:"GET"})

// 获取用户地址信息
export const reqUseAddressInfo=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})

// 获取用户商品信息
export const reqOrderInfo=()=>requests({url:"/order/auth/trade",method:"get"})

// 提交订单信息
export const reqSummitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})

// 获取订单支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})

//查询订单支付状态
export const reqorderPayInfo=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})

//获取我的订单列表 /api/order/auth/{page}/{limit}  GET 
export const reqOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})
