const bcrypt = require('bcryptjs')
const { isEmpty } = require('lodash')

const {
  userFormatError,
  userAlreadyExists,
  userRegistrationError,
  userDoesNotExist,
  userInfoGetFailed,
  userPasswordIncorrect
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
    ctx.throw(userFormatError)
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
      return ctx.app.emit('error', userAlreadyExists, ctx)
    }
  } catch(err) {
    console.error(userRegistrationError.message, err)
    ctx.throw(userRegistrationError)
  }

  await next()
} 

const cryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body || {}

  const hash = bcrypt.hashSync(password, 10)

  ctx.request.body.password = hash
  await next()
}

// 登录验证
const verifyLogin = async (ctx, next) => {
  const {user_name, password} = ctx.request.body || {}
  let userData = []

  try {
    userData = await getUserInfo({
      user_name
    })
  } catch(err) {
    console.error(userInfoGetFailed.message, err)
    ctx.throw(userInfoGetFailed)
  }

  if(isEmpty(userData)) {{
    ctx.throw(userDoesNotExist)
  }}
  
  // 比对用户输入的密码和数据库里的密码是否一致
  if(!bcrypt.compareSync(password, userData.password)) {
    ctx.throw(userPasswordIncorrect)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}