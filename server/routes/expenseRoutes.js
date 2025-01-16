const express = require('express')
const cors = require('cors')
const requireAuth = require('../middleware/requireAuth')
const {
    getExpensesFromUser,
    getOneExpense,
    createExpense,
    deleteExpense,
    updateExpense,
 } = require('../controllers/expenseControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'https://budget-tracker-izau.onrender.com/'
    })
);

//Requiring auth middlware so that a user must be authorized to use these routes
router.get('/', requireAuth, getExpensesFromUser)
router.get('/:id', requireAuth, getOneExpense)
router.post('/', requireAuth, createExpense)
router.delete('/:id', requireAuth, deleteExpense)
router.patch('/:id', requireAuth, updateExpense)

module.exports = router