const validator = require('validator');
const isEmpty = require("./isEmpty")
module.exports = function validatorRegister(data) {
    let errors = {}
    /**  确保是个字符串,如果是空返回一个"",
    如果传过来的没有这个字段,那么给他默认空字符串走不能为空选项*/
    data.name = isEmpty(data.name) ? "" : data.name
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password
    data.password2 = isEmpty(data.password2) ? "" : data.password2
    // console.log(data.name)
    // console.log(validator.isLength(data.name,{min:2,max:6}))
    if (!validator.isLength(data.name, {
            min: 2,
            max: 15
        })) {
        errors.name = "名字长度不能小于2位且不能超过15位！"
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "名字不能为空！"
    }
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
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "密码2不能为空！"
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "两次密码不一致！"
    }
    return {
        errors,
        isValid: isEmpty(errors) //是否通过验证
    }
}