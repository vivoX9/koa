const koa = require("koa") //引入koa
const koaRouter = require("koa-router") //引入koa-router路由
const mongoose = require("mongoose") //引入Mongoose
const app = new koa() //实例化koa
const router = new koaRouter() //实例化KoaRouter路由
const db = require("./config/key").mongoURL //引入mongoDB
const users = require("./routes/api/users") //引入user用户api
const profile = require("./routes/api/profile") //引入user用户api
const passport = require('koa-passport') //引入验证邮箱密码token是否正确模块
const bodyParser = require("koa-bodyparser") //引入koa-bodyparse，前端传的post数据都可以解析
// 连接mongoose
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB连接成功了...")
}).catch(err => {
    console.log(err)
})
mongoose.set('useFindAndModify', false);

// 使用bodyparser
app.use(bodyParser())
// koa-password初始化
app.use(passport.initialize())
app.use(passport.session())
// 回调到congig的password.js中
require("./config/password")(passport)
// 路由
router.get("/", async (ctx) => {
    ctx.body = "koa已经成功了"
})

// 配置路由地址 localhost:5000/api/users
router.use("/api/users", users)
router.use("/api/profile", profile)
// 配置路由
app.use(router.routes()).use(router.allowedMethods())
// 端口
const port = process.env.PORT || 1314 //因为会上传到...中，没有的话就用520
// 监听端口

app.listen(port,'127.0.0.1', () => {
    console.log(`服务器运行了,端口号为${port}`)
})

