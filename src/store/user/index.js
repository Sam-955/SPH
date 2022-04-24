//登录和注册模块都在此处
import {reqGetcode,reqRegisterUser,reqLogin,reqUserInfo,reqUserLogout} from "@/api"
import {getToken,removeToken, setToken} from "@/utils/token"
const state={
     code:'',
     token:getToken(),
     useInfo:{}
}
const actions={
    async getCode({commit},phoneNumber){
       const result= await reqGetcode(phoneNumber)
       console.log(result)
       if(result.code==200){
           commit("GETCODE",result.data)
       }
    },
    async confirmRegister({commit},data){
        const result= await reqRegisterUser(data)
     
    },
    async login({commit},data){
       let result = await reqLogin(data)
       if(result.code==200){
          console.log("result.data.token----",result.data.token)
          commit("LOGIN",result.data.token)
          setToken(result.data.token)
          return "ok"
       }else{
           Promise.reject(new Error('faile'))
       }
    },
    //  mounted 如果在header里面是无法触发的，因为header组件不变不进行模板的更新
    async userInfo({commit}){
        const result= await reqUserInfo()
        console.log("useinfo--",result)
        if(result.code==200){
            commit("USERINFO",result.data)
            return "ok"
        }else{
            Promise.reject(new Error("faile"))
        }
    },
    async logout({commit,state}){
        
        let result= await reqUserLogout()
        console.log("logoutresult---",result)
        if(result.code==200){
            commit("LOGOUT")
            return "ok"
        }else{
            Promise.reject(new Error("faile"))
        }
    }
}
const mutations={
    GETCODE(state,value){
        state.code=value
    },
    LOGIN(state,value){
        state.token=value
    },
    USERINFO(state,value){
        state.useInfo=value
    },
    LOGOUT(state){
        state.useInfo={}
        removeToken()
    }

}
const getters={
    // useInfo(state){
    //     return state.useInfo || ""
    // }
}

export default{
    state,
    actions,
    mutations,
    getters,
}