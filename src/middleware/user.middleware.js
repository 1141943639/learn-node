const bcrypt = require('bcryptjs')
const { isEmpty } = require('lodash')

const {
  usernameCannotBeEmpty,
  userAlreadyExists,
  userRegistrationError,
  userDoesNotExist,
  userPasswordIncorrect,
  incorrectPasswordType,
  passwordCanNotBeBlank,
} = require('../constants/error.type.js')

const {
  getUserInfo
} = require('../service/user.service.js')

const { isString } = require('lodash')

const userValidator = async (ctx, next) => {
  // 校验必填项
  const {
    user_name,
    password
  } = ctx?.request?.body || {}

  // 校验用户名
  if(!user_name) {
    ctx.throw(usernameCannotBeEmpty)
  }

  // 校验密码
  try {
    passwordValidate(password)
  } catch(err) {
    ctx.throw(err)
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
  let userData = (
    await getUserInfo({
      user_name
    })
  ) || {}

  if(isEmpty(userData)) {{
    ctx.throw(userDoesNotExist)
  }}
  
  // 比对用户输入的密码和数据库里的密码是否一致
  if(!bcrypt.compareSync(password, userData.password)) {
    ctx.throw(userPasswordIncorrect)
  }

  await next()
}

// 密码验证器
const passwordValidate = (password) => {
  if(!password) {
    throw passwordCanNotBeBlank // 密码不能为空
  } 
  
  if(!isString(password)) {
    throw incorrectPasswordType // 密码类型不正确, 应为string类型
  }

  password = password.trim()
  if(!password) {
    throw passwordCanNotBeBlank // 密码不能为空
  }
}

// 密码验证中间件
const passwordValidator = async (ctx, next) => {
  const password = ctx.request?.body?.password

  // 校验密码数据
  try {
    passwordValidate(password)
  } catch(err) {
    ctx.throw(err)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
  passwordValidate,
  passwordValidator
}