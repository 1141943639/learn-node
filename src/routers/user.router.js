const Router = require('koa-router')

const router = new Router({prefix: '/users'})

const {
  register,
  login
} = require('../controller/user.controller.js')

// 用户注册接口
// POST /users/register
router.post('/register', register)


// 用户登录接口
// POST /users/login
router.post('/login', login)

module.exports = router