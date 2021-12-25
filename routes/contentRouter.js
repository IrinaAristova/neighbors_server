const Router = require('express')
const router = new Router()
const contentController = require('../controllers/contentController')

router.post('/:id',contentController.create)
router.post('/update/:id',contentController.update)
router.get('/',contentController.getAllContents)
router.get('/:id',contentController.getOneContent)
router.delete('/:id', contentController.delete)


module.exports = router
