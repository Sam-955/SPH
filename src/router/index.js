import VueRouter from "vue-router";
import Vue from "vue";
import store from "@/store"
// 使用插件
Vue.use(VueRouter)
// 引入路由组件

import routes from "./routes"
import {getToken,removeToken} from "@/utils/token"

// 重写push 和 replace方法
let originPush = VueRouter.prototype.push
//重写
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this)
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//配置路由
const vueRouter = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      },
})

vueRouter.beforeEach(async(to,from ,next)=>{
    let token=store.state.user.token //token 一定是仓库中获取而来
    let useName=store.state.user.useInfo.name 
    //有token代表用户登录，一定是从仓库中获取，如果直接从本地获取，可能关闭页面后，存储的数据就不存在了
    if(token){
        //登录了不能去login
        if(to.path=="/login"){
        //    alert("已登录，不需要再登录")
           next("/home")
        }else{
          // 登录了如果想跳转到其它页面，这个时候需要获得useInfo来显示header组件
          if(useName&&useName!=null){ 
            //  alert("用户名存在")
             next()
          }else{//如果useName不存在了（页面更新会导致vuex中数据清楚），需要重新获取数据
            try{
               alert("重新获取数据")
            //    removeToken()
            //    alert("重新获取数据")
               await store.dispatch("userInfo")
            //    alert("有数据了吗")
               next()
            }
            catch(error){
                //token失效了获取不到用户信息，退出登录，然后返回登录界面
               await store.dispatch("logout")
               next('/login')
            }    
          }
        }
    }else{
        // alert("用户信息不存在，建议先登录")
        // 问题1：当用户信息不存在时，不能跳往登录页- 个人中心（center、购物车、我的订单）
        let toPath=to.path
        if(toPath.indexOf("/center")!=-1||toPath.indexOf('/shopCart')!=-1||toPath.indexOf('/trade')!=-1){
            //都需要跳转到登录页面
            alert(1)
            // this.$router.push('/login?redirect='+to.path)  这里要用next()进行路由的下一步跳转
            next('/login?redirect='+toPath)
            // 用路由参数的形式将 原本来跳往的地址带到登录页面
            
        }

        // 问题2：在未登录这些页面，但是要往这些页面跳 只能跳到登录界面中
        // 问题3：跳到登录页面以后，登录完成不能简单的跳会home，跳到开始需要跳的哪个路由

        next()
    }
})
export default vueRouter