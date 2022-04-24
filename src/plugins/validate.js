import VeeValidate from "vee-validate";
import Vue from "vue";
Vue.use(VeeValidate)

//中文提示信息
import zh_CN, { attributes } from "vee-validate/dist/locale/zh_CN"

// 表单验证
VeeValidate.Validator.localize("zh_CN",{
    //配置
    messages:{
        ...zh_CN.messages,
        // 规则
        is:(field)=>`${field}必须与密码相同`
    },
    attributes:{
      phone:"手机",
      code:"验证码",
      password:"密码",
      password1:"确认密码",
      agree:"同意"
    }
});
// "tongyi" 规则名
VeeValidate.Validator.extend("tongyi",{
  // 这里是验证（规则）
  validate: (value) => {
    return value;
   },
  getMessage:(field)=>field + "必须同意",
})
