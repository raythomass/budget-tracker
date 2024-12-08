const express = require('express')
const cors = require('cors')
const {signupUser} = require('../controllers/userControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/signup', signupUser)

module.exports = router