const { Router } = require('express')
const publications = require('../controller/publications.controller')
const router = new Router()

// router.get('/',publications.index)
router.get('/show/:category',publications.show)
router.get('/search/',publications.search)
router.post('/user/:user_id/create',publications.store)
router.get('/user/:user_id/index',publications.index)

module.exports = router
