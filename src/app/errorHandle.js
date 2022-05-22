const isEmpty = require('lodash/isEmpty')

module.exports = async (error = {}, ctx = {}) => {
  if(
    [
      error,
      ctx
    ].some(val => isEmpty(val))
  ) {
    throw new Error('错误处理缺少参数')
  }

  let status = 500

  switch(error?.code) {
    case '100001':
      status = 400
      break
    case '100002':
      status = 409
      break
  }

  ctx.status = status
  ctx.body = error
}