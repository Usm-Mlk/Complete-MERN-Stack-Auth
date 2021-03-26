import React from 'react'
import { Link, Redirect } from 'react-router-dom'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">PLACEHOLDER</h1>
                <p className="lead">
                    PLACEHOLDER
                </p>
                <div className="buttons">
                    <Link to="/register-user" className="btn btn-primary">Sign Up As User</Link>
                    <Link to="/login-user" className="btn btn-light">Login As User</Link>
                </div>
                <div style={{paddingTop: "20px"}}></div>
                <div className="buttons">
                    <Link to="/register-dealer" className="btn btn-primary">Sign Up As Dealer</Link>
                    <Link to="/login-dealer" className="btn btn-light">Login As Dealer</Link>
                </div>
                </div>
            </div>
        </section>
    )
}
export default Landing