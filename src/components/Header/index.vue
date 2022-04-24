<template>
  <div class="outer">
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>

            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login" >登录<span>{{"\n"}}</span></router-link>
              <router-link to="/register" >免费注册</router-link>
            </p>
            <p v-else>
              <span>欢迎   </span>
              <a >用户: {{userName}}<span>{{"\n"}}</span></a>
              <a @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <a href="###">我的订单</a>
            <a href="###">我的购物车</a>
            <router-link to="center">个人中心</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <img src="./images/logo.png" alt="" />
          </a>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed:{
    userName(){
      return this.$store.state.user.useInfo.loginName
    }
  },
  methods: {
    // 路由跳转
    goSearch() {
      // 路由跳转简单字符串形式,采用param形式 需要在路由配置中留出位置

      // this.$router.push('/search/'+this.keyword+"?Upkeyword="+this.keyword.toUpperCase())
      //模板字符串形式
      // this.$router.push("`/search/${this.keyword}?Upkeyword=${this.keyword.toUpperCase()}`")
      // 对象形式,对象形式必在路由里面配置name，这个也是用的最多传递形式
      //  if(this.keyword==''){this.$router.push({name:"search",params:{keyword:""||undefined},query:{k:this.keyword.toUpperCase}})}
      //  else(this.$router.push({name:"search",params:{keyword:this.keyword},query:{Upkeyword:this.keyword.toUpperCase()}}))
      // if(this.$route.query){

      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };

      if (this.$route.query) {
        let query = this.$route.query;
        location.query = query;
      }
      console.log(location);
      this.$router.push(location);
    },
    async logout(){
      try{
          await this.$store.dispatch("logout")
          await this.$store.dispatch("userInfo")
          this.$router.push("/home")

      }
      catch(error){
            // alert()
            error.message
      }
     
    }
  },
  mounted() {
    this.$bus.$on("clear",() =>{this.keyword = ""; })
  },
  // watch: {
  //   keyword: {handle(newValue){
  //     console.log("检测到keyword",newValue)
  //   } },
  // },
};
</script>

<style lang="less" scoped>
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .top .container .loginList {
  float: left;
}
.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.outer .header > .top .container .typeList {
  float: right;
}
.outer .header > .top .container .typeList a {
  padding: 0 10px;
}
.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .bottom .logoArea {
  float: left;
}
.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>
