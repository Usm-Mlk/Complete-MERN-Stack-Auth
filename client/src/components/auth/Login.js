import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { login } from '../../actions/auth'


const Login = ({login, isAuthenticated}) => {
    const [formdata, setFormdata]= useState({
        email: '',
        password: ''
    })

    const {email, password}= formdata

    const onSubmit= e => {
        e.preventDefault()

        login(email, password)
        setFormdata({
            email: '',
            password: ''
        })
    }

    const onChange= e => 
    setFormdata({ ...formdata, [e.target.name] : e.target.value })

    if(isAuthenticated){
        return <Redirect to='/' />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Login To Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}
const mapStateToProps= state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, login })(Login)