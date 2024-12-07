const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Expense = require('./expenseModel')

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
    expenses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }

})

module.exports = mongoose.model('User', userSchema);
