const express = require('express')
const cors = require('cors')
const requireAuth = require('../middleware/requireAuth');
const {
    getUserWithData,
    signupUser,
    loginUser,
    getUserWithExpenses,
    getUserWithIncome} = require('../controllers/userControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'https://budget-tracker-izau.onrender.com/'
    })
);

//Requiring auth middlware so that a user must be authorized to use these routes
//api/users/
router.get('/data', requireAuth, getUserWithData)
router.get('/expenses', requireAuth, getUserWithExpenses)
router.get('/income', requireAuth, getUserWithIncome)
//api/users/signup
router.post('/signup', signupUser)
//api/users/login
router.post('/login', loginUser)

module.exports = router