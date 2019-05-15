const mongoose = require("mongoose")
const Schema = mongoose.Schema //引用模板
// 实例化数据模板
const UserSchema = new Schema({
    name: {//名字
        type: String,//数据类型
        required: true //是否必填
    },
    email: {//邮箱
        type: String,//数据类型
        required: true //是否必填
    },
    password: { //密码
        type: String,//数据类型
        required: true //是否必填
    },
    avatar: {//头像
        type: String//数据类型
    },
    date: {//日期
        type: Date,//数据格式
        default: Date.now 
    }
})
module.exports=User=mongoose.model("users",UserSchema)