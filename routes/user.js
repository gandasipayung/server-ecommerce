const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/admin/register', UserController.registerAdmin)
router.post('/user/register', UserController.registerUser)
router.post('/login', UserController.login)

module.exports = router