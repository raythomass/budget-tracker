const express = require('express')
const cors = require('cors')
const requireAuth = require('../middleware/requireAuth')
const {
    createExpense,
    deleteExpense,
    getExpensesFromUser
 } = require('../controllers/expenseControllers')

const router = express.Router()
// router.use(requireAuth)

//Will need a requireAuth to be able to post an expense

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/', requireAuth, getExpensesFromUser)
router.post('/', requireAuth, createExpense)
router.delete('/:id', deleteExpense)

module.exports = router