const mongoose = require('mongoose')

const incomeModel = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
    }
})

const Income = mongoose.model('Income', incomeModel);

module.exports = Income;