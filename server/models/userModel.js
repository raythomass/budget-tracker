const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Expense = require('./expenseModel')
const Income = require('./incomeModel');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    income: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income'
    }]

})

const User = mongoose.model('User', userSchema);

module.exports = User;
