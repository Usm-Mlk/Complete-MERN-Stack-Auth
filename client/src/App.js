// I M P O R T S
import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'

// Components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import RegisterDealer from './components/auth/RegisterDealer'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import LoginDealer from './components/auth/LoginDealer'

// REDUX
import store from './store'
import { loadUser } from './actions/auth'
import { loadDealer } from './actions/authDealer'

// Styles
import './App.css'


if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App=() => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])  
  useEffect(() => {
    store.dispatch(loadDealer())
  }, [])  
  return (
    <React.Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className="container">
        <Alerts />
        <Switch>
          <Route exact path='/register-user' component={Register} />
          <Route exact path='/register-dealer' component={RegisterDealer} />
          <Route exact path='/login-user' component={Login} />
          <Route exact path='/login-dealer' component={LoginDealer} />
        </Switch>
      </section>
    </React.Fragment>
  );
}
export default App