const express = require('express')
const cors = require('cors')
const { getUserWithExpenses, signupUser, loginUser} = require('../controllers/userControllers')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

//Requiring auth middlware so that a user must be authorized to use these routes
//api/users/
router.get('/', requireAuth, getUserWithExpenses)
//api/users/signup
router.post('/signup', signupUser)
//api/users/login
router.post('/login', loginUser)

module.exports = router