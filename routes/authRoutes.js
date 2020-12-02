const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController')

router.get('/sign_in', AuthController.login_create_get)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)


module.exports = router