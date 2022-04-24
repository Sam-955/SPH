<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="item in cartList.cartInfoList"
          :key="item.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              :checked="item.isChecked == 1"
              name="chk_list"
              @click="changeChecked(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', item.skuId, item.skuNum)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="
                handler('change', item.skuId, $event.target.value, item.skuNum)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', item.skuId, item.skuNum)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck() && cartInfoList.length > 0"
          @click="changeAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价(不含运费):</em>
          <i class="summoney"
            ><strong>{{ totalPrice }}</strong></i
          >
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  mounted() {
    //Dom更新完成后需要向服务器请求数
    this.getData();
  },

  methods: {
    //获取个人购物车的数据
    getData() {
      this.$store.dispatch("getShopCartList");
    },
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        elert(error.message);
      }
    },
    async changeAllChecked(event) {
      try {
        let status = event.target.checked ? "1" : "0";
        await this.$store.dispatch("changeAllChecked", status);
        alert(123)
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    isAllCheck() {
      let tag = false;
      // // let reasult=document.querySelectorAll("input")
      // for(let item in reasult){
      //   console.log("reeee",item)
      // }
      if (
        this.cartList.cartInfoList.every((item) => {
          item.isChecked == 1;
        })
      ) {
        tag = true;
      }
      return tag;
    },

    handler: throttle(async function (type, id, value, skuNum = 0) {
      // 判断类型，然后给服务器发请求
      if (type === "minus") {
        if (value < 1) {
          value = 0;
        } else value = -1;
      } else if (type === "add") {
        value = 1;
      } else {
        //这里针对文本框里面的数据做出判断，如果输入的是非法的数字,或者小于1的数 都将不做出改变
        if (isNaN(value) || value < 1) {
          value = 0;
        } else {
          // 还有一种情况是输入的数据有小数点 用parseInt取整
          value = parseInt(value - skuNum);
        }
      }
      //给action派发请求
      try {
        // 这里没加异步导致了 点击加的时候 数据没有返回回来，页面没有更新
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: id,
          skuNumber: value,
        });
        //重新向服务器请求数据更新页面
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    
    //这里会由于用户删除过快导致数据返回不过来，所以需要节流处理

    deleteCart: throttle(async function (item) {
      try {
        await this.$store.dispatch("deleteCartById", item.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),

    async changeChecked(item, event) {
      console.log("event.target.checked---", event.target.checked);
      let value = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("changeChecked", {
          skuId: item.skuId,
          isChecked: value,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },

  computed: {
    ...mapGetters(["cartInfoList", "cartList"]),
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((element) => {
        sum += element.cartPrice * element.skuNum;
      });
      return sum;
    },
    // sum(){
    //   return item.cartPrice * item.skuName
    // },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }
        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>