import { reqGetSearchInfo } from "@/api"
const state = {
    searchInfo: {}
}
const actions = {
    async getSearchInfo(context, params) {
        // console.log("打印getSearchInfo请求结果")
        let result = await reqGetSearchInfo(params)
        // console.log("打印getSearchInfo请求结果",result)
        if (result.code == 200) {
            context.commit("REQSEARCHINFO", result.data)
        } else {
            throw new console.error(result.error);
        }
    },
}
const mutations = {
    REQSEARCHINFO(state, value) {
        state.searchInfo = value 
    }
}
const getters = {
    getGoodsList(state){
        //这里的state上下文为当前仓库，区别在组件computed中的state模块
        // 还需要注意的一点是如果由于网络慢，请求的数据还没返回，可以给空数组，不然会出现undefined
        // console.log("getter---",state.searchInfo.goodsList)
        return state.searchInfo.goodsList || []
    },
    getAttrsList(state){
        //这里的state上下文为当前仓库，区别在组件computed中的state模块
        // 还需要注意的一点是如果由于网络慢，请求的数据还没返回，可以给空数组，不然会出现undefined
        // console.log("getter---",state.searchInfo.goodsList)
        return state.searchInfo.attrsList ||[]
    },
    getTrademarkList(state){
        //这里的state上下文为当前仓库，区别在组件computed中的state模块
        // 还需要注意的一点是如果由于网络慢，请求的数据还没返回，可以给空数组，不然会出现undefined
        // console.log("getter---",state.searchInfo.goodsList)
        return state.searchInfo.trademarkList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}