const Router = require('koa-router')

const router = new Router({prefix: '/users'})

// GET /users/info
router.get('/info', (ctx) => {
  ctx.body = {
    username: '严国荣',
    age: 19,
    height: 200
  }
})

module.exports = router