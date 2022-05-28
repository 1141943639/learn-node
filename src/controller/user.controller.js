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
    const {user_name} = ctx.request.body || {}

    ctx.body = {
      message: ['欢迎回来', user_name].join(', ')
    }
  }
}

module.exports = new UserController()