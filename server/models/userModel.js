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
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//Statics can be called when the model is imported into other files
//Statics for user will be used in the user controllers
//This signup takes in name, email, and password which are required to signup
userSchema.statics.signup = async function (name, email, password) {
    //If there is no name, email, or password entered then an error occurs
    if(!name || !email || !password) {
        throw Error('All fields must be entered')
    }
    //Find a user by their email since it must be unique
    //The user that is found will be made into a const called exists because it already existrs in the DB
    const exists = await this.findOne({email})
    //If there is an existimng user the throw an error because they cannot sign up if they exist
    if(exists) {
        throw Error('Email already in use')
    }
    //If the user does not exists, we create a variable called salt where bcrypt genrates a salt of 10
    const salt = await bcrypt.genSalt(10)
    //Then we make bcrypt hash the password that was enetered and add the salt we just created to it
    const hash = await bcrypt.hash(password, salt)
    //Then we create a user with the previously entered name, email, and password
    //The password will be set to the hash variable because the hashed password needs to be stored for safety
    const user = await this.create({name, email, password: hash})
    //Returns the user just create with name, email, and a hashed password
    return user
};

//This login assumes a user is already in the DB
//The login takes in an email and password
userSchema.statics.login = async function (email, password) {
    //If there is no email or password entered then an error occurs
    if(!email || !password) {
        throw Error('All fields must be entered')
    }
    //Find a user based on thier unique email and make a const called user
    const user = await this.findOne({ email })
    //If there is no user found by email throw and error telling the user
    if(!user) {
        throw Error('Email not found')
    }
    //Bcrypt compares the password enetred to the password of the user that was found by email previously
    const match = await bcrypt.compare(password, user.password)
    //If the passwords do not match throw and error that they do not match
    if(!match){
        throw Error('Incorrect Password')
    }
    //If the passwords do match and all the previous logic checks out, return the user
    return user
};

const User = mongoose.model('User', userSchema);

module.exports = User;
