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
const DealersSchema = require('../../models/Dealers')
// MIDDLEWARE 
const auth = require('../../middleware/authDealer')


// @route   GET api/auth
// @desc    Getting Dealers Auth
// @access  PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const dealer= await Dealers.findById(req.dealer.id).select('-password')
        res.json(dealer)
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Server Error')
    }
})


// @route   POST api/auth
// @desc    Authenticate Dealer and Get Token
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
        // CHECKING DEALER's PREVIOUS EXISTANCE
        let dealer= await Dealers.findOne({ email })
        if(!dealer){
            return res.status(400).json({ errors: [{ msg: 'In-Valid Credentials' }] })
        }
        // PASSWORDS MATCHING   
        const isMatch= await bcrypt.compare(password, dealer.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'In-Valid Credentials' }] })
        }
        // RETURNING BACK THE TOKEN
        const payload= {
            dealer: {
                id: dealer.id,
                email: dealer.email
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