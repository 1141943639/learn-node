// 第三方库
const jwt = require('jsonwebtoken')

// 通用方法
const { filterObjField } = require('../utils/common.js')

// 环境变量
const {
  JWT_SECRET
} = require('../config/config.default.js')

// 服务
const {
  createUser,
  getUserInfo,
  updateUser
} = require('../service/user.service.js')

// 错误信息对象
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
    try {
      const { user_name } = ctx.request.body || {}
      const res = (
        await getUserInfo({
          user_name
        })
      ) || {}
      const resUser = filterObjField(res, ['user_name', 'is_admin', 'id']) || {}

      ctx.body = {
        code: 0,
        message: ['欢迎回来', user_name].filter(val => val).join(', '),
        result: {
          token: jwt.sign(resUser, JWT_SECRET, {expiresIn: '1d'})
        }
      }
    } catch(err) {
      console.error(err)
      ctx.throw('用户登录失败')
    }
  }

  // 修改密码
  async changePassword(ctx, next) {
    const userID = ctx.state?.user?.id
    const password = ctx.request?.body?.password
   
    await updateUser({
      data: {
        password
      },
      id: userID
    })

    ctx.body = {
      code: 0,
      message: '修改成功',
      result: ''
    }
  }
}

module.exports = new UserController()