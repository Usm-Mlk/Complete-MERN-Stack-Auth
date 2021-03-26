const mongoose = require('mongoose')


// Schema Decleration 
const DealersSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    estateName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    cellPhone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalAddress: {
        type: String,
        requied: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    cnicNumber: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports= Dealers = mongoose.model('dealers', DealersSchema);