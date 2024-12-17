const mongoose = require('mongoose')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')

//GET EXPENSES
const getExpensesFromUser = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId).populate('expenses')
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
          }
        res.status(200).json({
            success: true,
            userId: userId,
            count: user.expenses.length,
            data: user.expenses,
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//CREATE EXPENSE
const createExpense = async (req, res) => {
    const { amount, description, category } = req.body

    try {
        const userId = req.user._id
        const expense = await Expense.create({ amount, description, category })
        const user = await User.findById(userId)
        user.expenses.push(expense._id)
        await user.save()
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE EXPENSE
const deleteExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findOneAndDelete({_id: id})
        const user = await User.findById(process.env.TEST_USER_ID)
        user.expenses.pull(id)
        await user.save()
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    createExpense,
    deleteExpense,
    getExpensesFromUser
}