const express = require('express')
const cors = require('cors')
const {
    createExpense,
    deleteExpense,
 } = require('../controllers/expenseControllers')

const router = express.Router()

//Will need a requireAuth to be able to post an expense

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/', createExpense)
router.delete('/:id', deleteExpense)

module.exports = router