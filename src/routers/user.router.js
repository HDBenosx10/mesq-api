const { Router } = require('express')
const user = require('../controller/user.controller')
const router = new Router()

router.get('/',user.index)
router.post('/',user.store)

module.exports = router
