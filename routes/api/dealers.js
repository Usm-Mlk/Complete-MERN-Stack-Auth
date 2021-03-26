const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Dealers = require('../../models/Dealers')
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require('config') 



// @route   POST api/dealers
// @desc    REGISTER DEALER
// @access  PUBLIC
router.post('/', [
    // VALIDATIONS
    check('name', 'Please enter your name').not().isEmpty(),
    check('estateName', 'Please enter estate name').not().isEmpty(),
    check('email', 'Estate Name is Required').isEmail(),
    check('city', 'Enter city name').not().isEmpty(),
    check('country', 'Enter country name').not().isEmpty(),
    check('postalAddress', 'Enter postal address').not().isEmpty(),
    check('serviceDescription', 'Enter your service description').not().isEmpty(),
    check('companyAddress','Enter company address').not().isEmpty(),
    check('cnicNumber', 'Enter CNIC number').not().isEmpty(),
    check('password', 'Please enter password with eight or more characters').isLength({ min: 6 }),
    check('cellPhone', 'Enter valid cellphone number').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        name,
        estateName,
        email,
        city,
        country,
        postalAddress,
        serviceDescription,
        companyAddress,
        cnicNumber,
        website,
        avatar,
        password,
        cellPhone
        }= req.body
    try {
        // CHECKING USER's PREVIOUS EXISTANCE
        let dealer= await Dealers.findOne({ email })
        if(dealer){
            return res.status(400).json({ errors: [{ msg: 'Dealer already exists' }] })
        }
        // GET USER's GRAVATAR
        const avatar= gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // CREATING NEW INSTANCE OF USER
        dealer= new Dealers({
            name,
            estateName,
            email,
            city,
            country,
            postalAddress,
            serviceDescription,
            companyAddress,
            cnicNumber,
            website,
            avatar,
            password,
            cellPhone
        })
        // PASSWORD ENCRYPTION
        const salt= await bcrypt.genSalt(10)
        dealer.password= await bcrypt.hash(password, salt)
        //SAVING USER IN DATABASE
        await dealer.save()
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