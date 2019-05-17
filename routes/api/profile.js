// 个人信息接口
const koaRouter = require("koa-router")
const router = new koaRouter()
const passport = require("koa-passport")

// 引入模板实例
const profile = require("../../modules/profile")

// @接口名 GET api/progile/test
// @接口说明  测试接口地址
// @接口开放 接口是公开的
router.get("/test", async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        msg: "profile已经成功运行了"
    }
})


// @接口名 GET api/profile
// @接口说明  个人信息接口地址
// @接口开放 接口是私有的
router.get("/", passport.authenticate('jwt', {
    session: false
}), async (ctx) => {
    // console.log(ctx.state.user)
    const profileRes = await profile.find({
        user: ctx.state.user.id
    }).populate("user", ["name", "avatar"])
    /**  populate前面指的是查id，populate已经开始跨表查找
     * ,第一个参数为模型，第二个为需要查找的字段*/
    // console.log(profileRes)
    if (profileRes.length > 0) {
        ctx.status = 200
        ctx.body = profileRes
    } else {
        ctx.status = 404
        ctx.body = {
            noprofile: "该用户无个人信息！"
        }
        return;
    }
})

// @接口名 POST api/progile
// @接口说明  添加和编辑接口地址
// @接口开放 接口是私有的

router.post("/", passport.authenticate('jwt', {
        session: false
    }), async (ctx) => {
        const profileData = {}
        profileData.user = ctx.state.user.id
        // handle
        if (ctx.request.body.handle) {
            profileData.handle = ctx.request.body.handle
        }
        // company
        if (ctx.request.body.company) {
            profileData.company = ctx.request.body.company
        }
        // website
        if (ctx.request.body.website) {
            profileData.website = ctx.request.body.website
        }
        // location
        if (ctx.request.body.location) {
            profileData.location = ctx.request.body.location
        }
        // status
        if (ctx.request.body.status) {
            profileData.status = ctx.request.body.status
        }
        // skills数据转换"html,css,js,vue"
        if (typeof ctx.request.body.skill !== "undefined") {
            profileData.skill = ctx.request.body.skill.split(",")
        }
        // bio
        if (ctx.request.body.bio) {
            profileData.bio = ctx.request.body.bio
        }
        profileData.social = {}
        // wechat
        if (ctx.request.body.wechat) {
            profileData.social.wechat = ctx.request.body.wechat
        }
        // QQ
        if (ctx.request.body.QQ) {
            profileData.social.QQ = ctx.request.body.QQ
        }

        // 查询数据库
        const profileResult = await profile.find({
            user: ctx.state.user.id
        })
        if (profileResult.length > 0) {
            // 编辑更新
            const profileUpdate = await profile.findOneAndUpdate({
                    user: ctx.state.user.id
                }, {
                    $set: profileData
                }, {
                    new: true,
                }

            )
            ctx.body = profileUpdate
        } else {
            await new profile(profileData).save().then((profile) => {
                ctx.status = 200
                ctx.body = profile
            }).catch((err) => {
                console.log(err)
            })
        }
    }

)
// @接口名 GET api/progile/handle?handle=xxx
// @接口说明  个人信息接口地址
// @接口开放 接口是公开的
router.get("/handle",passport.authenticate('jwt', {
    session: false
}), async (ctx) => {
    let data=ctx.query.handle
    console.log(data)
})
module.exports = router.routes()
//获取用户信息方式 1.通过handle,2.通过user.id3.通过test