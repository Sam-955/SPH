<template>
  <div class="">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home 、search显示，在login、register隐藏，可以通过$route 来获取当前路由上的属性信息，meta、path、query param等参数 -->
    <!-- <Footer></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/index"
import Footer from "@/components/Footer/index.vue"

export default {
  name:"App",
  components:{
   Header,
   Footer,
  },
  
  mounted(){
    this.$store.dispatch("categoryList");
    // this.$store.dispatch("userInfo");
  }
}
</script>

<style lang="less" scoped>
</style>
