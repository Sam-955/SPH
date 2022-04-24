
//  全局组件到入口文件处执行一次，然后生效
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from "./components/TypeNav"
import Carsousel from"./components/Carsousel"
import Pagination from "./components/Pagination"
import 'element-ui/lib/theme-chalk/index.css'
import {MessageBox} from "element-ui"
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 测试 reqCategoryList 接口
import {reqCategoryList,reqBannerList,reqUserInfo,reqFloorList,reqUserLogout,reqGetSearchInfo,reqGoodsDetailInfo,reqAddOrUpdateShopCart,reqDeleteCartById,reqChangeChecked,reqGetcode} from "@/api"
let a=reqUserInfo()
console.log("123---",a)
// a.then((value)=>{
//       console.log(value.code)
// }),(err)=>{
//   alert('请求错误')
// }
//在网页中使用store仓库
import store from "@/store"
import "@/mock/mockServe"
import "swiper/css/swiper.css"
import * as API from "@/api"
import {Button,Select} from "element-ui"
import VueLazyload from 'vue-lazyload'
import atm from "@/assets/images/1.gif"
import "@/plugins/validate"
Vue.use(VueLazyload,{
  loading:atm ,
})
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// import store from './store'
// 将三级组件设置为全局组件，这里就需要用到了vue.component(组件name，组件)来注册为全局组件，注册完以后谁需要就放入谁的组件中
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)
new Vue({
  //全局事件总线配置
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$api=API
  },
  router,
  // 将store加入到Vue的架子中
  store,
  render: h => h(App)
}).$mount('#app')
