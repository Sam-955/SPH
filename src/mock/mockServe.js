// webpack配置下，图片和json文件默认对外暴露

import banner from "./banner.json"
import floors from "./floors.json"
// import Mock from "mockjs"
const Mock=require("mockjs")

// mock 参数说明，第一个是参数是请求地址，第二个参数是请求数据
Mock.mock("/mock/banner",{code:200,data:banner}) //模拟轮播图
Mock.mock("/mock/floors",{code:200,data:floors})


