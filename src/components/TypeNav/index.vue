<template>
  <div class="outer">
    <!-- 商品分类导航 -->
    <!-- {{categoryList}} -->
    <div class="type-nav" @mouseleave="leaveShow ">
      <div class="container">
        <h2 class="all" @mouseenter="enterShow">
          全部商品分类
        </h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
          <!-- <router-link to="/search" href="###">秒杀</router-link> -->
        </nav>
        <!-- transition 的属性是v-enter,name就只要写 sort，然后后面再写类名只需要加上 sort-，sor-enter,sort-enter-to -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearchs">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: index == currentIndex }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ index }}--{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: index === currentIndex ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c1.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c1.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash"
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    //
    ...mapState({
      //categoryList:state=>{state.home.categoryList}  这样写没有加返回值
      categoryList: (state) => state.home.categoryList, // 此处的state是大仓库数据
    }),
  },
  // 组件挂载完毕执行mounted
  mounted() {
    // this.show = false;
    // this.$store.dispatch("categoryList"); 优化，放入App组件中，只请求一次
    // 在这里判断组件(可以通过路由来获取)，根据组件的不同设置不同的展示方式
    
    if (this.$route.path!== "/home"&&this.$route.path!== "/") {
      this.show = false;
    }
  },
  methods: {
    //  这里如果业务过多，可能会出线浏览器加载不过来的现象，所以需要进行防抖和节流，
    //  防抖可以用插件 lodash实现 ,lodash的有个默认对象_ 可以用_来取库里面的方法，比如, _debounce(function(){},1000)回调时间，只会在最后一个操作才开始执行function 函数
    // 将changeIndex改为节流的方式，来防止也业务过多后，浏览器加载解析出现卡顿
    // changeIndex: throttle(function(index){
    //    this.currentIndex = index
    // },50),
    changeIndex(index) {
      this.currentIndex = index;
    },
    changeIndexEnd() {
      this.currentIndex = -1;
    },
    // 关于路由的跳转，路由跳转有声明式跟编程式，声明式跳转在页面解析时会加载组件实例，如果数量过多会占用大量的内存，
    // 如果用编程式路由跳转，this.$router.push/replace,这样会在标签中产出很多回调函数，也不太可取
    // 可以才采用事件委派+编程式跳转的方式来实现路由跳转
    // 采用事件委派和编程式跳转的方式带来一些问题
    // 怎么传递参数，怎么确定是点击a标签才能出现跳转的现象，怎么确定是1级组件是二级组件还是三级组，这里可以同通过给标签来绑定自定定义属性来判断筛选
    goSearchs(event) {
      let element = event.target;
      // 注意这里的element.dataset 才能拿到自定义的属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //  console.log(element.dataset)
      if (categoryname) {
        // 一级分类 二级分类 三级分类的a标签
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1ID = category1id;
        } else if (category2id) {
          query.category2ID = category2id;
        } else {
          query.category3ID = category3id;
        }
        location.query = query;
        // console.log(location)
        this.$router.push(location);
      }
     
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.show = false;
      this.currentIndex=-1
      if (this.$route.path.includes("/home")||this.$route.path=== "/") {
    //  if (this.$route.path==="/search") {
        this.show = true;
      }
      
    },
  },

};
</script>

<style lang="less" scoped>
// .sort
.cur:hover {
  background-color: skyblue;
  cursor: pointer;
}
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
// 过渡动画的样式
.outer .type-nav .container .sort-enter{
height: 0;
// transform: rotate(0deg);
}
.outer .type-nav .container .sort-enter-to{
height: 461px;
// transform: rotate(360deg);
}
.outer .type-nav .container .sort-enter-active{
transition: all 1s linear;
}
// .sort-enter-leave{

// }

.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
// .outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
//   display: block;
// }
</style>
