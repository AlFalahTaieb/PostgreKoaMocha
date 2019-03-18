const Koa = require('koa')
const indexRoutes = require('./routes/index')
const distroRoutes = require('./routes/distro')
const app = new Koa()

const PORT =  process.env.PORT || 3000
// app.use(async (ctx) => {
//     ctx.body = {
//         status: 'success',
//         message: 'Hi,Taieb, This is working'
//     }
// })


app.use(indexRoutes.routes())
app.use(distroRoutes.routes())

const server = app.listen(PORT, () => {
    console.log(`Server Listening on port: ${PORT}`)
})



module.exports = server