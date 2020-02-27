const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.getCart)
router.get('/transactions', CartController.getTransactions)
router.post('/', CartController.addCart)
router.patch('/', CartController.checkoutUpdate)
router.delete('/:id', CartController.deleteCart)

module.exports = router