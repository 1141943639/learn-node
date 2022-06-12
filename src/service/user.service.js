const User = require('../model/use.model.js')

// 错误信息对象
const {
  userInfoGetFailed,
  userDoesNotExist,
  userDataUpdateFailed
} = require('../constants/error.type')

// lodash
const { isEmpty } = require('lodash')

class UserService {
  // 创建用户
  async createUser(user_name, password) {
    // TODO 写入数据库
    return (
      await User.create({
        user_name,
        password
      })
    )?.dataValues
  }

  async getUserInfo(query, {
    raw = false
  } = {}) {
    try {
      const userRes = await User.findOne({
        where: query
      })

      return raw ? userRes : userRes?.dataValues
    } catch(err) {
      console.error(err)
      throw userInfoGetFailed // 用户信息获取失败
    }
  }

  updateUser = async ({
    data = {},
    id
  } = {}) => {
    // 更新密码数据
    try {
      const res = Boolean(
        (
          await User.update(data, {
            where: { 
              id
            }
          })
        )?.[0]
      )

      if(!res) {
        throw userDataUpdateFailed
      }

      return res
    } catch(err) {
      console.error(err)
      throw userDataUpdateFailed // 用户数据更新失败
    }
  }
}

module.exports = new UserService()