const Koa = require('koa')

const app = new Koa()

const userRouter = require('../routers/user.router.js')

app.use(userRouter.routes())

module.exports = app