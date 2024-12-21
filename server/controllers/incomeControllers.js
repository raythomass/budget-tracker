const mongoose = require('mongoose')
const User = require('../models/userModel')
const Income = require('../models/incomeModel')

//GET INCOME BASED ON USER
const getIncomeFromUser = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId).populate('income')
 
        if(!user) {
            return res.status(400).json({ success: false, error: 'User not found'})
        }

        res.status(200).json({
            success: true,
            userId: userId,
            count: user.income.length,
            data: user.income
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
//GET A SINGLE INCOME
const getOneIncome = async (req, res) => {
    const { id } = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "That expense does not exist"})
        }

        const income = await Income.findById(id)

        if(!income) {
            return res.status(400).json({ success: false, error: 'Income not found'})
        }
        
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//CREATE INCOME
const createIncome = async (req, res) => {
    const { amount, description, source } = req.body

    try {
        const userId = req.user._id

        const income = await Income.create({
            amount,
            description,
            source
        })

        const user = await User.findById(userId)

        user.income.push(income._id)
        await user.save()

        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//DELETE INCOME
const deleteIncome = async (req, res) => {
    const { id } = req.params
    try {
        const userId = req.user._id

        const income = await Income.findOneAndDelete({_id: id})

        const user = await User.findById(userId)

        user.income.pull(id)
        await user.save()

        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//UPDATE INCOME
const updateIncome = async (req, res) => {
    const { id } = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "That expense does not exist"})
        }

        const income = await Income.findOneAndUpdate({_id: id}, {...req.body})

        if(!income) {
            return res.status(400).json({error: "Income could not be found"})
        }

        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getIncomeFromUser,
    getOneIncome,
    createIncome,
    deleteIncome,
    updateIncome
}