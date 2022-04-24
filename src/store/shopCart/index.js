import { reqCartList, reqAddOrUpdateShopCart, reqDeleteCartById, reqChangeChecked } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    cartList: [],
    // cartInfoList: [],
    uuid_token: getUUID(),
}
const actions = {

    async getShopCartList(context) {
        let result = await reqCartList()
        context.commit("REQCARTLIST", result.data)
    },
    async deleteCartById(context, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "okkk"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    async changeChecked(context, { skuId, isChecked }) {
        let result = await reqChangeChecked(skuId, isChecked)
        console.log(result)
        if (result.code == 200) {
            context.commit("REQCARTLIST", result.data)
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    deleteAllChecked({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartInfoList.forEach(element => {
            let result = element.isChecked == 1 ? dispatch("deleteCartById", element.skuId) : ""
            PromiseAll.push(result)
        });
        return Promise.all(PromiseAll)
    },
    changeAllChecked({ dispatch, getters }, status) {
        let promiseAll = []
        getters.cartInfoList.forEach(item => {
            let result = dispatch("changeChecked", {skuId: item.skuId,isChecked: status })
            console.log({ skuId: item.skuId, isChecked: item.isChecked })
            promiseAll.push(result)
        }
        )
      return  Promise.all(promiseAll)
    }


}
const mutations = {
    REQCARTLIST(state, item) {
        state.cartList = item
    },
    // REQCHANGECHECKED(state, item) {
    //     state.cartList = item
    // }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    cartInfoList(state) {
        if (state.cartList[0]) { return state.cartList[0].cartInfoList || [] }
        return []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}