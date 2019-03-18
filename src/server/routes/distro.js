const Router = require('koa-router')
const router = new Router()

const queries = require('../db/queries/distro')

const BASE_URL = '/dist'


router.get(BASE_URL, async (ctx) => {
    try {
        const dist= await queries.getAllDistros()
        ctx.body = {
            status: 'success',
            data: dist
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router