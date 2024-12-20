const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//This file is used to make sure that a user is authorized to do certain actions in the application
//This file will be used in the controllers as needed 
//In the controllers, this middleware will make sure that a user is authorized before it runs the given action
const requireAuth = async (req, res, next) => {
    //Grabs the authoization from the headers
    const { authorization } = req.headers
    //Tells unauthorized users they need a token to do what they are trying to do
    if (!authorization) {
        return res.status(401).json('Authorization token required')
    }
    //if the user is authorized, this grabs just the token from the header
    const token = req.header('Authorization')?.split(' ')[1];

    try {
        //Grabs the id from verifying the token with the secret
        const {_id} = jwt.verify(token, process.env.SECRET)
        //the user is then set to the user that is found from the id
        //This allows ceratin actions to be connected to a certain user
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth