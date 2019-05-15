// 公共组件加密密码
const bcrypt = require("bcryptjs")


const tools = {
    decode(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    }
}
module.exports = tools