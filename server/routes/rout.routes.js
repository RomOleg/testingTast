const Router = require('express')
const router = new Router()
const routController = require('../controller/rout.controller')

router.get('/rout', routController.getRout)
router.post('/rout', routController.createRout)
router.delete('/rout/:id', routController.deleteRout)

module.exports = router

// test
// супер изменения которые улучшат жизнь миллионам 