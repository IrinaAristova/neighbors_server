const Router = require('express')
const router = new Router()
const districtController = require('../controllers/districtController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',districtController.create)
router.get('/',districtController.getAllDistrict)


module.exports = router
