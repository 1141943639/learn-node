// 依赖
const Koa = require('koa')
const KoaBody = require('koa-body')

const app = new Koa()

// 路由
const userRouter = require('../routers/user.router.js')

// 错误处理
const errorHandle = require('./errorHandle.js')

app.use(errorHandle)
app.use(KoaBody())
app.use(userRouter.routes())

module.exports = app