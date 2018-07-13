/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

router.get('/login', controllers.login.get)
router.get('/getOptions', controllers.getOptions.get)
router.get('/getTitle', controllers.getTitle.get)
router.get('/check', controllers.check.get)

module.exports = router
