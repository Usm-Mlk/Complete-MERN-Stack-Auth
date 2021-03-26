// In this file we have different routes:
//      Private Route for hiiting jwt on header and decoding it
//      Login Route 

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('config') 
const bcrypt = require('bcryptjs')
// MODEL 
const Users = require('../../models/Users')
// MIDDLEWARE 
const auth = require('../../middleware/auth')


// @route   GET api/auth
// @desc    TEST Route
// @access  PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const user= await Users.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Server Error')
    }
})


// @route   POST api/auth
// @desc    Authenticate User and Get Token
// @access  PUBLIC
router.post('/', [
    // VALIDATIONS
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password }= req.body
    try {
        // CHECKING USER's PREVIOUS EXISTANCE
        let user= await Users.findOne({ email })
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'In-Valid Credentials' }] })
        }
        // PASSWORDS MATCHING   
        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'In-Valid Credentials' }] })
        }
        // RETURNING BACK THE TOKEN
        const payload= {
            user: {
                id: user.id,
                email: user.email
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err

            res.json({ token })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server error')
    }
})
module.exports = router