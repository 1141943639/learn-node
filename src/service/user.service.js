const User = require('../model/use.model.js')

class UserService {
  // 创建用户
  async createUser(user_name, password) {
    throw new Error('测试')
    // TODO 写入数据库
    return (
      await User.create({
        user_name,
        password
      })
    ).dataValues
  }

  async getUserInfo(query) {
    return User.findOne({
      where: query
    })
  }
}

module.exports = new UserService()