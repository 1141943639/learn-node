const fs = require('fs');

const Router = require('koa-router')
const router = new Router()

const fieldRes = fs.readdirSync(__dirname)
const filesPath = fieldRes.filter(path => !path.includes('index'))

for(let i = 0; i < filesPath.length; i++) {
  const path = ['./', filesPath[i]].join('')
  const result = require(path)

  router.use(result.routes())
}

module.exports = router