const {
  createUser
} = require('../service/user.service.js')

const {
  userRegistrationError
} = require('../constants/error.type')
class UserController {
  async register(ctx, next) {
    // 获取数据
    const {
      user_name,
      password
    } = ctx.request.body

    try {
      // 操作数据
    const res = await createUser(user_name, password)
    
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name
      }
    }
    } catch(err) {
      console.error(err)
      ctx.app.emit('error', userRegistrationError, ctx)
    }
  }

  async login(ctx, next) {
    ctx.body = {
      message: '登陆成功'
    }
  }
}

module.exports = new UserController()