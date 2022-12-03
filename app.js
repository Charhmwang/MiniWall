const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Import .env file
require('dotenv/config')

app.use(bodyParser.json())

// Import the routes files
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const likesRoute = require('./routes/likes')

// Endpoints for user authorisation, posts operations, like and comment on posts
app.use('/api/user', authRoute)
app.use('/api/user/posts', postsRoute)
app.use('/api/user/posts',commentsRoute)
app.use('/api/user/posts',likesRoute)

// Connect database
mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is connected')
})

// Build up and run the server
app.listen(3000, ()=>{
    console.log('Server is up and running...')
})