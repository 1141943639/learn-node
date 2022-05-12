const app = require('./app/index')

const {
  APP_PORT
} = require('./config/config.default.js')

app.listen(APP_PORT, () => {
  console.log(`http://localhost:${APP_PORT}`)
})