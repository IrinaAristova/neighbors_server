const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/reg',userController.registration)
router.post('/log',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.delete('/:id',userController.deleteUser)
router.post('/update/:id', userController.updateUser)



module.exports = router
