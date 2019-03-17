const Router = require('koa-router')
const router = new Router()

const queries = require('../db/queries/distro')

const BASE_URL = '/distros'


router.get(BASE_URL, async (ctx) => {
    try {
        const distros= await queries.getAllDistros()
        ctx.body = {
            status: 'success',
            data: distros
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router