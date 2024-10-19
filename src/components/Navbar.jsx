import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="navbar">
            <Link to="/" className="logo">Aungstrome BookShop</Link>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/wishlist">Wish List</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
