const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const indexRoutes = require('./routes/index')
const distroRoutes = require('./routes/distro.js')
const app = new Koa()

const PORT =  process.env.PORT || 3000

app.use(bodyParser())
app.use(indexRoutes.routes())
app.use(distroRoutes.routes())

const server = app.listen(PORT, () => {
    console.log(`Server Listening on port: ${PORT}`)
})

module.exports = server