const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../controllers/auth')
// ----------------------------------------------------------------

// Get Routes
router.get('/',  userController.homePage)
router.get('/register', userController.loadPage)
router.get('/app',auth, userController.app)

// Post Routes
router.post('/register',express.urlencoded({ extended: true }),userController.addUser)
router.post('/login',express.urlencoded({ extended: true }), userController.login)


module.exports = router