const express = require('express')
const { register, signIn } = require('../controllers/authController')

const router = express.Router()

router.post('/register', register)
router.post('/login', signIn)


module.exports = router