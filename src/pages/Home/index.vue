<template>
  <div class="">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :data="item"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import Brand from "@/pages/Home/Brand"
import Floor from "@/pages/Home/Floor"
import Like from "@/pages/Home/Like"
import ListContainer from "@/pages/Home/ListContainer"
import Rank from "@/pages/Home/Rank"
import TodayRecommend from "@/pages/Home/TodayRecommend"
import {mapState} from "vuex"
export default {
  name:"Home",
  components:{
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  // 在组件挂载完以后，需要从服务器中取出数据
  mounted(){
    // this.$store.dispatch("categoryList")
    this.$store.dispatch("getFloorList")
    this.$store.dispatch("userInfo")
  },
  data(){
    return {
    }
  },
  computed:{
    // 从仓库中获取数据利用的是计算属性
    // 在计算属性名和state中的数据key相同是，可以下面这样写
    // ...mapState(['number'])
    // categoryList: (state) => state.home.categoryList
    //  ...mapState({
    //   //categoryList:state=>{state.home.categoryList}  这样写没有加返回值
    //   categoryList: (state) => state.home.categoryList, // 此处的state是大仓库数据
    // }),
    ...mapState({floorList:state=>state.home.floorList})
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
</style>
