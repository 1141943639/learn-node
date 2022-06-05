// 用户模块错误信息 code: 100
const userErrorType = {
  usernameCannotBeEmpty: {
    status: 400,
    code: '10001',
    result: '',
    message: '用户名不能为空'
  },
  userAlreadyExists:{
    status: 409,
    code: '10002',
    result: '',
    message: '已存在相同的用户名'
  },
  userRegistrationError: {
    code: '10003',
    result: '',
    message: '用户注册错误'
  },
  userDoesNotExist: {
    code: '10004',
    result: '',
    message: '用户不存在'
  },
  userInfoGetFailed: {
    code: '10005',
    result: '',
    message: '用户信息获取失败'
  },
  userPasswordIncorrect: {
    code: '10006',
    result: '',
    message: '密码不正确'
  },
  incorrectPasswordType: {
    code: '10007',
    result: '',
    message: '密码类型不正确, 应为string类型'
  },
  passwordCanNotBeBlank: {
    code: '10008',
    result: '',
    message: '密码不能为空'
  },
  userDataUpdateFailed: {
    code: '10009',
    result: '',
    message: '用户数据更新失败'
  }
}

// 权限模块错误信息 code:101
const authErrorType = {
  tokenExpiredError:{
    code: '10101',
    result: '',
    message: 'token已过期'
  },
  jsonWebTokenError: {
    code: '10102',
    result: '',
    message: '无效的token'
  }
}

module.exports = {
  ...userErrorType,
  ...authErrorType
}