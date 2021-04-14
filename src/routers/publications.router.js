const { Router } = require('express')
const publications = require('../controller/publications.controller')
const router = new Router()

router.get('/',publications.index)
router.get('/show/:category',publications.show)
router.get('/search/',publications.search)

module.exports = router