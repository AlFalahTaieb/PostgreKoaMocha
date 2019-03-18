const Router = require('koa-router')
const router = new Router()

const queries = require('../db/queries/distro')

const BASE_URL = '/distro'


router.get(BASE_URL, async (ctx) => {
    try {
        const distro= await queries.getAllDistros()
        ctx.body = {
            status: 'success',
            data: distro
        }
    } catch (err) {
        console.log(err)
    }
})

// module.exports = router

// const Router = require('koa-router')
// const router = new Router()


// router.get('/dist', async (ctx) => {
//     ctx.body = {
//         status: 'success',
//         message: 'SHIIIIIIIIIIIIIIIt'
//     }
// })

module.exports = router