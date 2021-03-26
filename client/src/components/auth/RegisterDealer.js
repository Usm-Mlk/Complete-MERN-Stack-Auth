import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

// REDUX
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { registerDealer } from '../../actions/authDealer'




const RegisterDealer = ({ setAlert, registerDealer, isAuthenticated }) => {
    const [formData, setFormData]= useState({
        name: '',
        estateName: '',
        email: '',
        city: '',
        country: '',
        postalAddress: '',
        serviceDescription: '',
        companyAddress: '',
        cnicNumber: '',
        website: '',
        cellPhone: '',
        password: '',
        password2: ''
    })
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
    cellPhone,
    password,
    password2
    }= formData

    const onChange= e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit= async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match', 'danger')
        } else {
            registerDealer({ 
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
                cellPhone,
                password2 })
        }
    }
    if(isAuthenticated){
        return <Redirect to='/' />
    }
    return (
        <Fragment>
        <h1 className="large text-primary">HELLO DEALERS</h1>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Estate Name" 
                    name="estateName" 
                    value={estateName} 
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
                    type="text" 
                    placeholder="Postal Address" 
                    name="postalAddress" 
                    value={postalAddress} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Service Description" 
                    name="serviceDescription" 
                    value={serviceDescription} 
                    onChange={e => onChange(e)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Company Address" 
                    name="companyAddress" 
                    value={companyAddress} 
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
                    placeholder="Website (optional)" 
                    name="website" 
                    value={website} 
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
    isAuthenticated: state.authDealer.isAuthenticated
})
export default connect(null, { setAlert, registerDealer })(RegisterDealer)