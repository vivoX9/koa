const keys = require("../config/key")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey; //关键字，此处从key.js里引入
const mongoose=require("mongoose")
const users=mongoose.model("users")
module.exports = passport => {
    // 因为passport是在app.js里引入的，所以，一运行项目的时候就会执行
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        // console.log(jwt_payload)
        // 通过id查询是否存在
        const user=await users.findById(jwt_payload.id)
        if(user){
            // 存在，返回结果到users.js里私密接口
            return done(null,user)
        }else{
            return done(null,false)
        }
    }))
}

/**passport-jwt是解析密码的跟koa-passport是对立的，
 * koa-passport是加密，passport-jwt是解密 */