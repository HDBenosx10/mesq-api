const { Router } = require('express')
const publications = require('../controller/publications.controller')
const router = new Router()

//===============/ROTAS PUBLICAS/=====================//
router.get('/',publications.index) //✅
router.get('/category/:category',publications.show) //✅
router.get('/search',publications.search) //✅
router.get('/user/:user_id',publications.user) //✅


router.post('/user/:user_id/create',publications.store)
router.delete('/delete/:publication_id',publications.delete)

module.exports = router
