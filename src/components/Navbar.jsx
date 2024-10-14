import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar">
        <h1>Book App</h1>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/wishlist">Wishlist</Link>
        </div>
    </nav>
);

export default Navbar;
