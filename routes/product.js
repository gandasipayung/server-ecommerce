const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getAllProduct)
router.get('/:id', ProductController.getProduct)

router.use(authentication)
router.post('/', authorization, ProductController.addProduct)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)



module.exports = router
