const User = require('../model/use.model.js')

class UserService {
  async createUser(user_name, password) {
    // TODO 写入数据库
    return (
      await User.create({
        user_name,
        password
      })
    ).dataValues
  }
}

module.exports = new UserService()