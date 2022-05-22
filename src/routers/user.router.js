const Router = require('koa-router')

const router = new Router({prefix: '/users'})

const {
  register,
  login
} = require('../controller/user.controller.js')

const {
  userValidator, // 校验参数
  verifyUser // 核实数据
} = require('../middleware/user.middleware.js')

// 用户注册接口
// POST /users/register
router.post('/register',userValidator, verifyUser,  register)


// 用户登录接口
// POST /users/login
router.post('/login', login)

module.exports = router