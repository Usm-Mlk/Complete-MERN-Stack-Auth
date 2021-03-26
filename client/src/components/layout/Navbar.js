import React, { Fragment } from 'react'
import {Link, Redirect} from 'react-router-dom'

// REDUX
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
    const authLinks= (
        <ul>
            <li>
                <Link to='/#!' onClick={ logout }>Logout</Link>
            </li>
        </ul>
    )
    const guestLinks= (
        <ul>
                <li><Link to="/register-user">Register</Link></li>
                <li><Link to="/login-user">Login</Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">Build Earth</Link>
            </h1>
            {
                !loading && (
                    <Fragment>
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                    </Fragment>
                ) 
            }
        </nav>
    )
}
const mapStateToProps= state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)