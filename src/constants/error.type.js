module.exports = {
  userFormatError: {
    status: 400,
    code: '10001',
    result: '',
    message: '用户名或密码为空'
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
  }
}