const {
  userFormatError,
  userAlreadyExists,
  userRegistrationError
} = require('../constants/error.type.js')

const {
  getUserInfo
} = require('../service/user.service.js')

const userValidator = async (ctx, next) => {
  // 校验必填项
  const {
    user_name,
    password
  } = ctx?.request?.body || {}

  if(!user_name || !password) {
    ctx.app.emit('error', userFormatError, ctx)

    return 
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const {
    user_name
  } = ctx?.request?.body || {}

  try {
    // 检查是否已有重复的用户名和密码
    if(await getUserInfo({
      user_name
    })) {
      ctx.app.emit('error', userAlreadyExists, ctx)
      
      return 
    }
  } catch(err) {
    console.error('获取用户信息失败: ', err)
    ctx.app.emit('error', userRegistrationError, ctx)
    return
  }

  await next()
} 

module.exports = {
  userValidator,
  verifyUser
}