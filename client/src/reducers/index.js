import { combineReducers } from 'redux'

import alert from './alert'
import auth from './auth'
import authDealer from './authDealer'

export default combineReducers({
    alert,
    auth,
    authDealer
})