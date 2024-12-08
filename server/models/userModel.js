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

userSchema.statics.signup = async function (name, email, password) {
    if(!name || !email || !password) {
        throw Error('All fields must be entered')
    }

    const exists = await this.findOne({email})
    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hash})

    return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;
