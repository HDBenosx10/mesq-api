const { Router } = require('express')
const user = require('../controller/user.controller')
const router = new Router()

router.get('/',user.index)
router.post('/create',user.store)
router.post('/login',user.login)
router.delete('/delete/:id',user.delete)
module.exports = router
