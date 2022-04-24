<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" 
      v-for="(item,index) in skuImageInfoList" 
      :key="item.id"
      >
        <img  
        :class="{active:curIndex===index}" 
        :src="item.imgUrl" 
        @click="changeHighLight(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next" @click="curIndex++"></div>
    <div class="swiper-button-prev" @click="curIndex--"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data(){
    return{
    curIndex:0
    }
  },
  methods:{
   changeHighLight(index){
     this.curIndex=index
     //通知大图也要变化，这里用到兄弟组件的通信，用 this.$bus.$emit()
     this.$bus.$emit("changeIndex",index)
   }
  },
  name: "ImageList",
  props: ["skuImageInfoList"],
  watch: {
    skuImageInfoList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView : 3,
          });
        },100);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    .active {
        border: 2px solid #f60;
        padding: 1px;
      }
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      // &.active {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }
  .active {
        border: 2px solid #f60;
        padding: 1px;
      }
  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>