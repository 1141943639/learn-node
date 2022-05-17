const Koa = require('koa')
const KoaBody = require('koa-body')

const app = new Koa()

const userRouter = require('../routers/user.router.js')

app.use(KoaBody())
app.use(userRouter.routes())

module.exports = app