const express = require('express')
const cors = require('cors')
const requireAuth = require('../middleware/requireAuth')
const {
    getExpensesFromUser,
    getOneExpense,
    createExpense,
    deleteExpense,
 } = require('../controllers/expenseControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/', requireAuth, getExpensesFromUser)
router.get('/:id', requireAuth, getOneExpense)
router.post('/', requireAuth, createExpense)
router.delete('/:id', requireAuth, deleteExpense)

module.exports = router