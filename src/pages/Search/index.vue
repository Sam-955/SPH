<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="deleteTag">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="deleteKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="deleteTrademark">×</i>
            </li>
            <!-- 平台售卖属性  由于属性很多，需要一条一条展示，所以需要用v-for循环,点击删除根据当前点击的索引值来剔除其所在list中的位置-->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}<i @click="deleteAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector
          :attrsList="getAttrsList"
          @trademarkSearchSelect="bySearchSelectSubmit"
          @attrInfo="attrInfo"
        />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 排序根据 searchparams中参数 1:desc 身上1和2的值来区别 是综合还是价格来控制active类的样式 -->
                <!-- 这里的isOne和isTwo需要 ()来触发，点击事件中的可能包装了（） -->
                <li :class="{'active':isOne()}"  @click="changeOrder('1')">
                  <!-- 这里将incon font icon-down类名分开写 将其转成变量形式 -->
                  <a>综合<span v-show="isOne()" class="iconfont " :class="{'icon-down':isDesc(),'icon-up':isAsc()}"></span></a>
                </li>
                <li :class="{'active':isTwo()}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo()" class="iconfont " :class="{'icon-down':isDesc(),'icon-up':isAsc()}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in getGoodsList"
                :key="index"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"><img :src="item.defaultImg"/></a> -->
                    <router-link :to="`/detail/${item.id}`"><img  v-lazy="item.defaultImg"/></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:voID(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @submitPagination="submitPagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
// import Detail from "../Detail/index.vue"
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1ID: "",
        category2ID: "",
        category3ID: "",
        categoryName: "",
        keyword: "",
        order: "", // 默认为综合排序
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    //...mapState({floorList:state=>state.home.floorList})
    // 由于这样写会很长，所以需要在getter中进行提前处理
    ...mapState({total:(state)=>state.search.searchInfo.total}),
    ...mapGetters(["getGoodsList", "getAttrsList", "getTrademarkList"]),
  },
  beforeMount() {
    // alert("okkk")
    // 在点击路由跳转后，会传参数给另一个模块，另一个模块要能接受这些参数并且 将这些数据更新到自己的仓库中，这个操作在beforeMount中操作，
    // 更新对象属性的方法可以用object.assign来合并两个对象，后面的对象覆盖前面对象，前面对象没有的，可以补充
    Object.assign(this.searchParams, this.$route.query, this.$route.params); // 这里只能在页面第一次加载的时候合并一次，所以需要监听路由的变化来改变请求的条件
    console.log("路由跳转开始执行beforemount");
  },
  mounted() {
    // console.log("执行search的mounted")
    // 由于这里的mounted在加载的时候只发一次请求，在请求页面如果有后续点击需要请求的数据就不能再发请求了，所以需要该位置
    // this.$store.dispatch("getSearchInfo",this.searchParams)
    this.getData();
    // console.log("请求数据")
  },
  methods: {
    getData() {
      // console.log("开始执行")
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    deleteTag() {
      //点击后将这个模块删除，通过去除searchParams.categoryName这个条件,同时还要将其对应的ID删除
      this.searchParams.categoryName = undefined;
      this.searchParams.category1ID = undefined;
      this.searchParams.category2ID = undefined;
      this.searchParams.category3ID = undefined;
      //标签消失后地址栏中的地址还是没有变化，所以需要 路由跳转，自己跳自己
      //自己跳完自己后，需要重新根据参数来向服务器发送数据请求，来展现页面
      // 在跳转前要做出判断params参数是否还在
      this.getData();
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    deleteKeyword() {
      this.searchParams.keyword = undefined; // 清楚标记
      this.getData; // 重新访问数据
      this.$bus.$emit("clear"); // 通过全局事件总线修改输入框中的值，子父传递
      // this.$router.push({name:"search"})                         // 路由重定向自己
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    deleteTrademark() {
      this.searchParams.trademark = undefined; // 清楚标记
      this.getData; // 重新访问数据
      this.$router.push({
        name: "search",
        query: this.$route.query,
        params: this.$route.query,
      });
      // alert('跳转')
      // this.$router.push({name:'search',query:this.$route.query})
    },
    deleteAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
      // alert("发送请求了吗")
    },
    bySearchSelectSubmit(selectData) {
      // 注意
      this.searchParams.trademark = `${selectData.tmId}:${selectData.tmName}`;
      this.getData();
    },
    //收集售卖属性
    attrInfo(attr, attrValue) {
      //attr是个对象
      // alert("wdddd")
      //可以通过打印来看参数 属性
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 在给其prop传递参数的时候需要判断该属性值是否存在，禁止其重复展示
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }

      this.getData();
    },
    // 判断排序的背景样式
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc(){
      return this.searchParams.order.indexOf("asc")!=-1
    },
    isDesc(){
      return this.searchParams.order.indexOf("desc")!=-1
    },
    changeOrder(flag){
        // 前提，每次点击完成后都会向服务器发送数据请求，返回得searchParamso都是新的数据，
        // 发送请求前需要将 当前组件的参数传递回去，用新的参数替换旧参数
        let newOrder=''
        
        if(flag===this.searchParams.order.split(':')[0]){
          //条件成立代表点击的是同一个按钮，此时上下的 排序的顺序需要发送变化
           newOrder=`${flag}:${this.searchParams.order.split(':')[1]=='desc'?'asc':'desc'}`
        }
        else{
           newOrder=`${this.searchParams.order.split(':')[0]=='1'?'2':'1'}:${this.searchParams.order.split(':')[1]}`
        }
        this.searchParams.order=newOrder
        console.log(newOrder)
        this.getData()
    },
    //点击分页向服务器发送数据请求
    submitPagination(page){
       this.searchParams.pageNo=page
       this.getData()
    }
  },
  watch: {
    $route: {
      // immediate:true,
      handler(newValue, oldValue) {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        // console.log(this.searchParams);
        //鼠标在点击另个一按钮时清楚之前ID缓存
        this.searchParams.category1ID = "";
        this.searchParams.category2ID = "";
        this.searchParams.category3ID = "";
      },
    },
  },
  components: {
    SearchSelector
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hIDden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hIDden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solID #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: mIDdle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solID #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: mIDdle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hIDden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: mIDdle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solID #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solID #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solID #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solID #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hIDden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: mIDdle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solID #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>