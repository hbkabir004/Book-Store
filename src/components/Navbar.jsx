import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="navbar">
            <div className="logo">MyWebsite</div>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/wishlist">Wish List</Link></li>
                    <li><Link to="#">Services</Link></li>
                    <li><Link to="#">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
