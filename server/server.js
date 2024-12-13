const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')

const app = express()
app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/users', userRoutes)
app.use('/api/expenses', expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to Database, Listening on PORT ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err)
    });