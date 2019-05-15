const validator = require('validator');
const isEmpty=require("./isEmpty")
module.exports=function validatorRegister(data){
    let errors={}
    if(!validator.isLength(data.name,{min:2,max:15})){
        errors.name="名字超度不能小于2位且不能超过15位！"
    }
    return {
        errors,
        isValid:isEmpty(errors)//是否通过验证
    }
}