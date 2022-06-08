// 依赖
const Koa = require('koa')
const KoaBody = require('koa-body')

const app = new Koa()

// 获取路由
const routers = require('../routers/index.js')

// 错误处理
const errorHandle = require('./errorHandle.js')

// 使用中间件
app.use(errorHandle) // 错误处理
app.use(KoaBody()) // body解析
app.use(routers.routes()) // 使用路由

module.exports = app