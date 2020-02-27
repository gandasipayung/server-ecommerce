const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.getCategory)


module.exports = router
