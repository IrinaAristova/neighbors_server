const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const districtRouter = require('./districtRouter')
const contentRouter = require('./contentRouter')


router.use('/user',userRouter)
router.use('/district',districtRouter)
router.use('/content',contentRouter)



module.exports = router
