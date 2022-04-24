//登录和注册模块都在此处
import {reqUseAddressInfo,reqOrderInfo} from "@/api"
const state={
    addressInfo:[],
    orderInfo:{}
}
const actions={
     async useAddressInfo({commit}){
         let result=await reqUseAddressInfo()
         console.log("reqUseAddressInfo--",result)
         if(result.code==200){
            commit("USADDRESSINFO",result.data)
            return "ok"
         }else{
            return Promise.reject(new Error("faile"))
         }
     },
     async orderInfo({commit}){
        let result=await reqOrderInfo()
        console.log("reqOrderInfo---",result)
        if(result.code==200){
           commit("ORDERINFO",result.data)
           return "ok"
        }else{
           return Promise.reject(new Error("faile"))
        }
    }
}
const mutations={
    USADDRESSINFO(state,value){
        state.addressInfo=value
    },
    ORDERINFO(state,value){
        state.orderInfo=value
    }
    
}
const getters={
  
}
export default{
    state,
    actions,
    mutations,
    getters,
}