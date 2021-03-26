import {
    DEALER_LOGIN_SUCCESS,
    DEALER_LOGIN_FAIL,
    DEALER_REGISTER_SUCCESS,
    DEALER_REGISTER_FAIL,
    DEALER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from '../actions/types'


// Auth State
const initialState = {
    // store token in local storage so we can access using vanilla JS
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    dealerUser: null
}
export default function(state= initialState, action){
    const { type, payload }= action
    switch(type){
        case DEALER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                dealerUser: payload
            }
        case DEALER_LOGIN_SUCCESS:
        case DEALER_REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case DEALER_LOGIN_FAIL:
        case DEALER_REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:    
            return state
    }
}