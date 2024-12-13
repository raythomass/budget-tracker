const mongoose = require('mongoose')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')

//CREATE EXPENSE
const createExpense = async (req, res) => {
    const { amount, description, category } = req.body

    try {
        const expense = await Expense.create({ amount, description, category })
        const user = await User.findById(process.env.TEST_USER_ID)
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
    deleteExpense
}