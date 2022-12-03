const express = require('express')
const router = express.Router()

// For user register and login
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

// For user password and token
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

// POST 1 (Register)
router.post('/register', async(req,res)=>{

    // Validation 1: Send back the result of body validation (to check user input)
    const {error} = registerValidation(req.body)
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2: Check if the user exists
    const userExists = await User.findOne({Email:req.body.Email})
    if (userExists) {
        return res.status(400).send({message: 'User already exists'})
    }

    // Create a hashed representation of password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.Password, salt)

    // Code to insert data
    const user = new User({
        Username:req.body.Username,
        Email:req.body.Email,
        Password:hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send({message: err})
    }
})

// POST 2 (Login)
router.post('/login', async(req,res)=>{
    
    // Validation 1: Send back the result of body validation (to check user input)
    const {error} = loginValidation(req.body)
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2: Check if the user already exists
    const user = await User.findOne({Email:req.body.Email})
    if (!user) {
        return res.status(400).send({message: 'User does not exist'})
    }

    // Validation 3: Check user password
    const passwordValidation = await bcryptjs.compare(req.body.Password, user.Password)
    if (!passwordValidation) {
        return res.status(400).send({message: 'Wrong password'})
    }

    // Generate an auth-token (to do any operation in the app, e.g. view posts etc.)
    const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token)
    res.send({"token": token})

})

module.exports = router