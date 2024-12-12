const express = require('express')
const cors = require('cors')
const {signupUser, loginUser} = require('../controllers/userControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = router