const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const router = require('./routes/index')

// middlewares
app.use(bodyparser())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:8000')
})
