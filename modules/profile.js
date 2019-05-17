const mongoose = require("mongoose")
const Schema = mongoose.Schema //引用模板
// 实例化数据模板
const profileSchema = new Schema({
    user: { //关联数据表
        type: String, //数据类型
        ref: "users",
        required: true //是否必填
    },
    handle: {
        type: String, //数据类型
        required: true, //是否必填
        max: 20
    },
    company: { //公司
        type: String,
    },
    website: { //个人网站
        type: String
    },
    location: { //地址
        type: String,
    },
    status: { //目前做什么工作
        type: String,
        required: true, //是否必填
    },
    skill: { //技能
        type: [String], //字符串数组
        required: true, //是否必填
    },
    bio: { //个人介绍
        type: String
    },
    githubusername: { //gtitgub地址
        type: String
    },
    experience: [{
        current: { //至今
            type: Boolean, //数据类型
            default: true, //默认
        },
        title: { //标题
            type: String,
            required: true, //是否必填
        },
        company: { //公司名称
            type: String,
            required: true, //是否必填
        },
        location: { //地址
            type: String,
        },
        from: { //xx时间开始
            type: String,
            required: true, //是否必填
        },
        to: { //xx时间结束
            type: String, //字符串数组
        },
        description: { //个人描述
            type: String
        }
    }],
    education: [{
        current: { //至今
            type: Boolean, //数据类型
            default: true, //默认
        },
        school: { //标题
            type: String,
            required: true, //是否必填
        },
        degree: { //学历
            type: String,
            required: true, //是否必填
        },
        major: { //专业
            type: String,
        },
        from: { //xx时间开始
            type: String,
            required: true, //是否必填
        },
        to: { //xx时间结束
            type: String, //字符串数组
        },
        description: { //个人描述
            type: String
        }
    }],
    social: {
        wechat: { //微信
            type: String,
        },
        QQ: { //xx时间开始
            type: String,
        },
    },
    date: { //日期
        type: Date, //数据格式
        default: Date.now
    }
})
module.exports = profile = mongoose.model("profile", profileSchema)