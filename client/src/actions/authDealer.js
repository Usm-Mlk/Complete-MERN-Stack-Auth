import axios from 'axios'
import {
    DEALER_REGISTER_SUCCESS,
    DEALER_REGISTER_FAIL,
    DEALER_LOGIN_SUCCESS,
    DEALER_LOGIN_FAIL,
    DEALER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// Load Dealer
export const loadDealer = () => async (dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
        try {
            const res= await axios.get('/api/auth/dealers')

            dispatch({
                type: DEALER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

// Register Dealer
export const registerDealer= ({
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
    password,
    cellPhone
}) => async dispatch => {
    const config= {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({ 
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
        password,
        cellPhone
    })
    try {
        const res = await axios.post('/api/dealers', body, config)
        dispatch({
            type: DEALER_REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadDealer())
    } catch(err){
        const errors= err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEALER_REGISTER_FAIL
        })
    }
}

// Login a user
export const dealerLogin= (email, password) => async dispatch => {
    const config= {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({ email, password })
    try {
        const res = await axios.post('/api/auth/dealers', body, config)
        dispatch({
            type: DEALER_LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadDealer())
    } catch(err){
        const errors= err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEALER_LOGIN_FAIL
        })
    }
}

// Logout a dealer
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}