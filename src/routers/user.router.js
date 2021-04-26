const { Router } = require('express')
const user = require('../controller/user.controller')
const authRequired = require('../middlewares/authRequired')
const router = new Router()

router.get('/:id',user.show)
router.post('/create',user.store)
router.post('/login',user.login)
router.delete('/delete/',authRequired,user.delete)
module.exports = router
