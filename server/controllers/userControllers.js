const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//Create a token by taking a _id, adding a secret from .env, and setting an expiration
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const getUserWithExpenses = async (req, res) => {
    try {
        const user = await User.findById(process.env.TEST_USER_ID).populate('expenses')
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//SIGNUP
const signupUser = async (req, res) => {
    //Grab the name, email, and password from the body
    const { name, email, password } = req.body

    try {
        //Use the static from the model to create the user with the name, email, and password 
        const user = await User.signup(name, email, password)
        //Create a token by entering the newly created user's id that is now in the DB
        const token = createToken(user._id)
        //If everything works, sned back the name, email, and newly created token
        res.status(200).json({name, email, token})
        
    } catch (error) {
        //If it does not work, send back the error message
        res.status(400).json({error: error.message})
    }
}

//LOGIN
const loginUser = async (req, res) => {
    //Grabbing the email and password enetred in the body
    const { email, password } = req.body

    try {
        //Use static from User model for login which takes in the email and password
        const user = await User.login(email, password)
        //Create a token from the user's _id from the DB
        const token = createToken(user._id)
        //Return the email and token when logged in
        res.status(200).json({email, token})
    } catch (error) {
        //If it does not work, send back the error message
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getUserWithExpenses,
    signupUser,
    loginUser
}