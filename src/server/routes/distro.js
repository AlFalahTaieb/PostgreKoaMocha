const Router = require('koa-router')
const router = new Router()

const queries = require('../db/queries/distro')

const BASE_URL = '/distros'

module.exports=router