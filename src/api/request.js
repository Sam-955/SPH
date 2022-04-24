//axios对ajax的二次封装
import axios from "axios"
// 进度条,还需要引入进度条的样式
import nprogress from "nprogress"
import "nprogress/nprogress.css"

import store from "@/store"
import {getToken} from "@/utils/token"
//创建 axios实例
let requests = axios.create({
    //基础路径
    baseURL: "/api",
    //请求不能超过5S
    timeout: 5000,
  });
// 请求拦截
requests.interceptors.request.use((config)=>{
    // 主要是对头部中的数据header进行处理
    // 进度条开始
    if(store.state.detail.uuid_token){
      // 注意这里的请求头
      config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
      config.headers.token=store.state.user.token
    }
    // if(getToken()){
    //   config.headers.token=getToken()
    // }
    nprogress.start
    return config
})
// 响应拦截(响应成功时的处理，和失败时的处理)
requests.interceptors.response.use((res)=>{
    // 进度条结束在数据返回成功以后
     nprogress.end
     return res.data
},(err)=>{
   alert("服务器请求失败")
   return Promise.reject(new Error('faile'))
})
// 这里对axios 进行的二次封装，所以需要对外暴露

export default requests