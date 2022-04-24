import  Vuex  from 'vuex'
import Vue from 'vue'
import home from '@/store/home'
import search from '@/store/search'
import detail from "@/store/detail"
import shopCart from "@/store/shopCart"
import user from "@/store/user"
import trade from "@/store/trade"
import pay from "@/store/pay"
// 注册插件
Vue.use(Vuex)
// 实例化这个模块（配置）
export default new Vuex.Store({
   modules:{
     home,
     search,
     detail,
     shopCart,
     user,
     trade
   }
})
