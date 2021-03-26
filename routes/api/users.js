// This file will have routes that will handle new users
// and registering users

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Users = require('../../models/Users')
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require('config') 

const chalk = require('chalk')


// @route   POST api/users
// @desc    REGISTER USER
// @access  PUBLIC
router.post('/', [
    // VALIDATIONS
    check('firstName', 'FirstName is Required').not().isEmpty(),
    check('lastName', 'LastName is Required').not().isEmpty(),
    check('cellPhone', 'Cellphone Number is Required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('address', 'Address is Required').not().isEmpty(),
    check('password', 'Please enter password with eight or more characters').isLength({ min: 6 }),
    check('cnicNumber', 'Enter a valid CNIC number').not().isEmpty(),
    check('city', 'City field is required').not().isEmpty(),
    check('country', 'Country field is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        firstName,
        lastName, 
        cellPhone, 
        email, 
        address, 
        password, 
        cnicNumber,
        avatar, 
        country, 
        
        city}= req.body
    try {
        // CHECKING USER's PREVIOUS EXISTANCE
        let user= await Users.findOne({ email })
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        // GET USER's GRAVATAR
        const avatar= gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // CREATING NEW INSTANCE OF USER
        user= new Users({
            firstName,
            lastName,
            cellPhone,
            email,
            address,
            password,
            avatar,
            cnicNumber,
            city, 
            country
        })
        // PASSWORD ENCRYPTION
        const salt= await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(password, salt)
        //SAVING USER IN DATABASE
        await user.save()
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