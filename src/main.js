const Koa = require('koa')
const Router = require('koa-router')

const {
  APP_PORT
} = require('./config/config.default.js')

const app = new Koa()

const userRouter = require('./routers/user.router.js')

app.use(userRouter.routes())

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`)
})