import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

// REDUX
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData]= useState({
        firstName: '',
        lastName: '',
        email: '',
        cellPhone: '',
        address: '',
        cnicNumber: '',
        city: '',
        country: '',
        password: '',
        password2: ''
    })
    const { firstName,
        lastName,
        email,
        cellPhone, 
        address, 
        cnicNumber, 
        city, 
        country, 
        password,
        password2
    }= formData

    const onChange= e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit= async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ firstName,
                lastName, 
                email, 
                cellPhone, 
                address, 
                cnicNumber, 
                city, 
                country, 
                password, 
                password2 })
        }
    }
    if(isAuthenticated){
        return <Redirect to='/' />
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="First Name" 
                    name="firstName" 
                    value={firstName} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    name="lastName" 
                    value={lastName} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Cellphone" 
                    name="cellPhone" 
                    value={cellPhone} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input
                    type="text" 
                    placeholder="CNIC Number" 
                    name="cnicNumber" 
                    value={cnicNumber} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input
                    type="text" 
                    placeholder="Address" 
                    name="address" 
                    value={address} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input
                    type="text" 
                    placeholder="City" 
                    name="city" 
                    value={city} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input
                    type="text" 
                    placeholder="Country" 
                    name="country" 
                    value={country} 
                    onChange={e => onChange(e)} 
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
            <div className="form-group">
            <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
            />
            </div>
                <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Register" 
                />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Login Here</Link>
        </p>
    </Fragment>
    )
}
const mapStateToProps= state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register)