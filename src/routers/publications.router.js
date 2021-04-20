const { Router } = require('express')
const publications = require('../controller/publications.controller')
const authRequired = require('../middlewares/authRequired')
const router = new Router()

//===============/ROTAS PUBLICAS/=====================//
router.get('/',publications.index) //✅
router.get('/category/:category',publications.show) //✅
router.get('/search',publications.search) //✅
router.get('/user/:user_id',publications.user) //✅


router.post('/create',authRequired,publications.store)
router.delete('/delete/:publication_id',publications.delete)

module.exports = router
