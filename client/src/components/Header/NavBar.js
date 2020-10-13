import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Dashboard</Link>
                <Link className = "nav-link" to='/Register'>My Account</Link>
                <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">Contact</a>
                <a className = "nav-link" target="_blank" rel="noopener norefferer" href="https://nodejs.org/en/docs/">Logout</a>
            </div>

        </div>
    )
};

export default NavBar;
