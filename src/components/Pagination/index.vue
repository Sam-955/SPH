<template>
  <div class="pagination center">
    <h1>{{startNumberEndNumber}}--totalpage:{{pageTotal}}</h1>
    <!-- 这个用start和end 来分开 用start和end来控制头尾隐藏，所以分为三栏写 -->
    <button :disabled="pageNo===1" @click="$emit('submitPagination',pageNo--)" >上一页</button>
    <button v-if="startNumberEndNumber.start >1"  @click="$emit('submitPagination',1)" >1</button>
    <button v-if="startNumberEndNumber.start>2">···</button>
    <button v-for="(item,index) in startNumberEndNumber.end" 
    :key="index"
     v-show="item>=startNumberEndNumber.start" 
     :class="{'bgc':pageNo===(index+1)}"
     @click="$emit('submitPagination',index+1)"
     >{{item}}</button>
    <button v-if="startNumberEndNumber.end<pageTotal-1">···</button>
    <button v-if="startNumberEndNumber.end<pageTotal">{{pageTotal}}</button>

    <button :disabled="pageNo===startNumberEndNumber.end" @click="$emit('submitPagination',pageNo++)">下一页</button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:["pageNo","pageSize","total","continues"],
  computed:{
    pageTotal(){
      //这里是由问题的，如果页数小于continus，那么
      return Math.ceil(this.total/this.pageSize) // 注意这里加this
    },
    startNumberEndNumber(){
      let start=1
      let end =3
       // 注意这里需要用到this.pageTotal
      if(this.continues>this.pageTotal){
        start=1,
        end=this.pageTotal
      }else{
          start=this.pageNo-parseInt(this.continues/2)
          // alert(start)
          end=this.pageNo+parseInt(this.continues/2)
          // alert(end)
          if(start<1){start=1,end=this.continues}
          if(end>this.pageTotal){
            start=this.pageTotal -this.continues
            end=this.pageTotal 
        }
      }
      return{start,end}
      
    }
  }
};
 
</script>

<style lang="less" scoped>

.center {
  text-align: center;
}
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  button:hover {
    background-color: skyblue;
  }
  .bgc{
  background-color: pink;
}
}
</style>