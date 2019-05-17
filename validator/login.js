const validator = require('validator');
const isEmpty = require("./isEmpty")
module.exports = function validatorLogin(data) {
    let errors = {}
    /**  确保是个字符串,如果是空返回一个"",
    如果传过来的没有这个字段,那么给他默认空字符串走不能为空选项*/
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password
    if (!validator.isEmail(data.email)) {
        errors.email = "邮箱不合法！"
    }
    
    if (validator.isEmpty(data.email)) {
        errors.email = "邮箱不能为空！"
    }
  
    if (!validator.isLength(data.password, {
            min: 6,
            max: 18
        })) {
        errors.password = "密码长度不能小于6位且不能超过18位！"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "密码不能为空！"
    }



    return {
        errors,
        isValid: isEmpty(errors) //是否通过验证
    }
}