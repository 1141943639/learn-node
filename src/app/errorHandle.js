module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    const {
      code = '99901',
      message,
      status = 500,
      result = ''
    } = err


    ctx.status = status || 500
    ctx.body = {
      code,
      message: message || err,
      result
    }
    
    console.error(err)
  }
}