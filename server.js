const express = require('express')
const connectDB = require('./config/db')
const chalk = require('chalk')

const app= express()


// DATABASE CONNECTION
connectDB();
// INIT MIDDLEWARE/ BODY PARSER
app.use(express.json({ extended: false }))
// ROUTES ACCESS
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/auth/dealers', require('./routes/api/authDealers'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/dealers', require('./routes/api/dealers'))
// PORT ALLOCATION
const PORT= process.env.PORT || 4000;
// APP LISTENER
app.listen(PORT, () => console.log(chalk.inverse.blue(`Server is running on Port ${PORT}`)))