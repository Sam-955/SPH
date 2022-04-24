import Home from "@/pages/Home"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Login from "@/pages/Login"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"
export default [
    {
        path: "/",
        component: Home,
        meta: {show:true},
        children: []
    },
    {
        path: "/paySuccess/:id?",
        component: PaySuccess,
        meta: { show: true },
        children: []
    },
    {
        path: "/pay/:id?",
        component: Pay,
        meta: { show: true },
        children: []
    },
    {
        path: "/detail/:id?",
        component: Detail,
        meta: { show: true },
        children: []
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        children: [
            {path:'myOrder',component:MyOrder},
            {path:'groupOrder',component:GroupOrder},
            {path:"/center",component:MyOrder},// 重定向
        ]
    },
    {
        path: "/trade/:id?",
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // alert("123")
            if(from.path.indexOf("/shopCart")!=-1){
                // alert("放行")
                next()
            }else{next(false)}
        },
        children: []
    },
    
    {
        path: "/addCartSucess/:id?",
        name:'addCartSucess',
        component: AddCartSuccess,
        meta: { show: true },
        children: []
    },
    {
        path: "/shopCart/:id?",
        name:'shopCart',
        component: ShopCart,
        meta: { show: true },
        children: []
    },
    {
        path: "/home",
        component: Home,
        meta: { show: true },
        children: []
    },
    {
        path: "/login",
        component: Login,
        meta: { show: true },
        children: []
    },
    {
        path: "/register",
        component: Register,
        meta: { show: true },
        children: []
    },

    // {
    //     path:"/search/:keyword", // 在占位的后面加上一个？ 来表示参数可传可不传，如果传个空串，路径会出问题，解决的话可以用 "" || undefinded来解决
    //     // path: "/search",
    //     component: Search,
    //     name: "search",
    //     props:true,
    //     // props: ($route)=>{
    //     //   return{keyword:$route.params.keyword,
    //     //   Upkeyword:$route.query.Upkeyword,}
    //     // },
    //     meta: { show: true },
    //     children: []
    // },
    {
        name: 'search',  // 是当前路由的标识名称
        path: '/search/:keyword?',
        component: Search,
        // 将params参数和query参数映射成属性传入路由组件
        meta: { show: true },
        // props: route => ({ keyword3: route.params.keyword, keyword4: route.query.keyword2 })
    },
    {
        path: ' ',
        redirect: '/home'
    }

]