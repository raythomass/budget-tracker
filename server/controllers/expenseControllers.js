const mongoose = require('mongoose')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')

//GET EXPENSES FROM A USER
const getExpensesFromUser = async (req, res) => {
    //userId is set as the user that is being authorized through the requireAuth
    const userId = req.user._id
    try {
        //Find a user based on the authorized user and populate their expenses array
        const user = await User.findById(userId).populate('expenses')
        //No user returns a message to the user
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
          }
        //A returns a the userId, a count the shows how many expnese the user has, and all the users expenses
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

//GET A SINGLE EXPENSE
const getOneExpense = async (req, res) => {
    //Grabs the id from the url param
    const { id } = req.params

    try {
        //If the id is not valid then retrun messafe
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "That expense does not exist"})
        }
        //Expense will be found by the id in the params
        const expense = await Expense.findById(id)
        //if theres no Id, return message 
        if(!id) {
            return res.status(400).json({error: "That expense could not be found"})
        }
        //if everything is successful, return the found Expense
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//CREATE EXPENSE
const createExpense = async (req, res) => {
    //Get fields being entered in the body
    const { amount, description, category } = req.body

    try {
        //Set userId as the authorized id from requireAuth
        const userId = req.user._id
        //Expense is created based off the req.body fields
        const expense = await Expense.create({ amount, description, category })
        //User will be set as the user from the authorization
        const user = await User.findById(userId)
        //Target the users expenses and push the new id into the array
        //This just pushes the id to the array but the info can be gathered by using .populate
        //Push updates the Mongo DB Compass data
        user.expenses.push(expense._id)
        //Save the user that was changed
        await user.save()
        //Return the expense created
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE EXPENSE
const deleteExpense = async (req, res) => {
    //Grabs the id from the url param
    const { id } = req.params
    try {
        //Set userId as the authorized id from requireAuth
        const userId = req.user._id
        //Find an expense based on the param id and delete it
        const expense = await Expense.findOneAndDelete({_id: id})
        //find user by the authorized user
        const user = await User.findById(userId)
        //Pull takes the id out of the Mongo DB Compass
        user.expenses.pull(id)
        //Save updated user
        await user.save()
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//UPDATE EXPENSE
const updateExpense = async (req, res) => {
    //Grab id from params
    const { id } = req.params
    try {
        //Checking the DB if the id is stored
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "That expense does not exist"})
        }
        //Finding an expense based on the id and updating it iwth the req.body
        const expense = await Expense.findOneAndUpdate({_id: id}, {...req.body})
        //If theres no expense let the user know
        if(!expense) {
            return res.status(400).json({error: "Expense could not be found"})
        }
        //Retrun the updated expense if successful
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getExpensesFromUser,
    getOneExpense,
    createExpense,
    deleteExpense,
    updateExpense
}