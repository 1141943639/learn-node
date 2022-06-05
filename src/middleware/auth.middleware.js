const jwt = require('jsonwebtoken')

// 环境变量
const {
  JWT_SECRET
} = require('../config/config.default.js')

// 错误信息
const {
  tokenExpiredError,
  jsonWebTokenError
} = require('../constants/error.type.js')

module.exports = {
  async auth(ctx, next) {
    try {
      const { authorization = '' } = ctx?.request?.header || {}
      const token = (authorization || '').replace('Bearer ', '')
      
      // 校验TOKEN
      const user = jwt.verify(token, JWT_SECRET)
      
      // 将登录信息放置在上下文中
      ctx.state.user = user
    } catch(err) {
      console.error('权限错误', err)

      let errMsg = '未登录'

      switch(err.name) {
        case 'TokenExpiredError': 
          errMsg = tokenExpiredError
          break

        case 'JsonWebTokenError':
          errMsg = jsonWebTokenError
          break
        
        default: errMsg = '未登录'
      }

      throw errMsg
    }

    await next()
  }
}