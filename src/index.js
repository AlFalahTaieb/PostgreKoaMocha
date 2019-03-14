const Koa = require('koa')

const app = new Koa()

const PORT = 3000

app.use(async(ctx)=>{
    ctx.body={
        status:'success',
        message:'Hi,Taieb'
    }
})


const server = app.listen(PORT, ()=>{
    console.log(`Server Listening on port: ${PORT}`)
})

module.exports=server;