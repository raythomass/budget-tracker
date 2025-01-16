const express = require('express')
const cors = require('cors')
const requireAuth = require('../middleware/requireAuth')
const {
    getIncomeFromUser,
    getOneIncome,
    createIncome,
    deleteIncome,
    updateIncome
} = require('../controllers/incomeControllers')

const router = express.Router()

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3001'
    })
);

router.get('/', requireAuth, getIncomeFromUser)
router.get('/:id', requireAuth,getOneIncome)
router.post('/', requireAuth, createIncome)
router.delete('/:id', requireAuth, deleteIncome)
router.patch('/:id', requireAuth, updateIncome)

module.exports = router