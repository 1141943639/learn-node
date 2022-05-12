class UserController {
  async register(ctx, next) {
    ctx.body = {
      message: '注册成功'
    }
  }

  async login(ctx, next) {
    ctx.body = {
      message: '登陆成功'
    }
  }
}

module.exports = new UserController()