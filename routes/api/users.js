const koaRouter = require("koa-router")
const router = new koaRouter()
const tools = require("../../config/tools")
const bcrypt = require("bcryptjs")
const gravatar = require('gravatar'); //全球公认头像
// 引入user
const user = require("../../modules/User")


// @接口名 GET api/users/test
// @接口说明  测试接口地址
// @接口开放 接口是公开的
router.get("/test", async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        msg: "koa-router已经成功运行了"
    }
})
// @接口名 POST api/users/register
// @接口说明  注册接口地址
// @接口开放 接口是公开的
router.post("/register", async (ctx) => {
    // ctx.status=200;
    // ctx.request.body 前端传递的注册信息
    // 存储至数据库
    const findResult = await user.find({
        email: ctx.request.body.email
    })

    if (findResult.length > 0) {
        // 如果已经注册了
        ctx.status = 500
        ctx.body = {
            email: "邮箱已被占用"
        }
    } else {
        // 如果未注册
        // d中的mm代表如果全球公认头像没有邮箱的头像给个默认的
        let avatar = gravatar.url(ctx.request.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new user({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            avatar,
            password: tools.decode(ctx.request.body.password)
        })
        // 存储到数据库
        await newUser.save().then(user => {
            ctx.body = user
        }).catch(err => {
            console.log(err)
        })
        // 返回数据给前端
        ctx.body = newUser
    }

    // ctx.body=ctx.request.body//使用Bodyparser后可以使用ctx.request.body
})

// @接口名 POST api/users/login
// @接口说明  登录接口地址
// @接口开放 接口是公开的
router.post('/login', async (ctx) => {
    // 第一步查询邮箱是否存在
    let findResult = await user.find({
        email: ctx.request.body.email
    })
    let password = ctx.request.body.password
    let users = findResult[0]
    console.log(findResult)
    if (findResult.length > 0) {
        // 查询到此邮箱对应用户
        //验证密码是否正确
        let checkPassword = bcrypt.compareSync(password, users.password); //第一个参数是要查询的密码，第二个参数为需要对比的密码
        if (checkPassword) {
            // 如果密码正确
            // 返回token
            ctx.status = 200
            ctx.body = {
                success: true
            }
        } else {
            // 如果密码错误
            ctx.status = 400;
            ctx.body = {
                password: "密码错误!"
            }
        }
    } else {
        // 未查询到此邮箱对应用户
        ctx.status = 404;
        ctx.body = {
            eamil: "用户不存在!"
        }
    }
})
module.exports = router.routes()