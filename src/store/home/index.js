import { reqCategoryList, reqBannerList,reqFloorList } from '@/api/index'

const state = {
    categoryList: [],
    bannerList:[],
    floorList:[]
}
const actions = {
    async categoryList(context) {
        //    console.log("调用home的action")
        // 从服务器拿取数据
        let result = await reqCategoryList()
        console.log("reqCategoryList-------------",result)
        //将数据提交到state中，但是数据格式不确实，最好返回后先看一下， 再去设置默认的数据类型
        if (result.code === 200) {
            context.commit("REQCATEGORYLIST", result.data)
        }
        //还需要对数据进行判断，返回的是成功还是错误
        // console.log(result)
        // 
    },
    async getBannerList(context) {
        let result = await reqBannerList()
        // console.log(result)
        context.commit("REQBANNERLIST", result.data)
    },
    async getFloorList(context){
       let result= await reqFloorList()
       context.commit("REQFLOORLIST",result.data)
    }
}
const mutations = {
    REQCATEGORYLIST(state, value) {
        // console.log("调用mutation")
        // console.log(value)
        state.categoryList = value
        // console.log(value)
        // state.
    },
    REQBANNERLIST(state, value) {
        state.bannerList = value
    },
    REQFLOORLIST(state,value){
     state.floorList=value
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}