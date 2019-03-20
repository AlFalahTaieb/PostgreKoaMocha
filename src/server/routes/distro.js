const Router = require('koa-router')
const router = new Router()

const queries = require('../db/queries/distro')

const BASE_URL = '/dist'


router.get(BASE_URL, async (ctx) => {
    try {
        const dist = await queries.getAllDistros()
        ctx.body = {
            status: 'success',
            data: dist
        }
    } catch (err) {
        console.log(err)
    }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {

    try {
        const distro = await queries.getSingleDistro(ctx.params.id)
        if (distro.length) {
            ctx.body = {
                status: 'success',
                data: distro
            }
        } else {
            ctx.status = 404
            ctx.body = {
                status: 'error',
                message: `This distro doesn't exist`
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})




module.exports = router