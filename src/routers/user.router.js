const Router = require('koa-router')

const router = new Router({prefix: '/users'})

const {
  register,
  login
} = require('../controller/user.controller.js')

const {
  userValidator, // 校验参数
  verifyUser, // 核实数据
  cryptPassword, // 密码加密
  verifyLogin, // 验证登录
} = require('../middleware/user.middleware.js')

// 用户注册接口
// POST /users/register
router.post('/register',userValidator, verifyUser, cryptPassword, register)


// 用户登录接口
// POST /users/login
router.post('/login', userValidator, verifyLogin, login)

module.exports = router