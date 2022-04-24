import {reqGoodsDetailInfo,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from "@/utils/uuid_token"
const state={
     goodsDetailInfo:{},
     uuid_token:getUUID(),
}
const actions={
    async getGoodsDetailInfo(context,skuid){
        let result= await reqGoodsDetailInfo(skuid)
        // alert(1)
        if(result.code==200){
            // console.log(JSON.stringify(result.data))
            // alert(2)
          context.commit("REQGOODSDETAILINFO",result.data)
        }
    },
    async addOrUpdateShopCart(context,{skuId,skuNumber}){
          let result = await reqAddOrUpdateShopCart(skuId,skuNumber)
          console.log('result',result)
           if(result.code==200){
               //返回的是成功的标记
            return "OKK"
           }else{
               //返回失败的标记
             return Promise.reject(new Error("faile"))
           }
    }
}
const mutations={
    REQGOODSDETAILINFO(state,value){
        state.goodsDetailInfo=value
    }
}
const getters={
    getCategoryView(state){
      return state.goodsDetailInfo.categoryView || {}
    },
    getSkuInfo(state){
      return state.goodsDetailInfo.skuInfo || {}
    },
    getSpuSaleAttrList(state){
        return state.goodsDetailInfo.spuSaleAttrList || []
      },
}
export default{
    state,
    actions,
    mutations,
    getters
}