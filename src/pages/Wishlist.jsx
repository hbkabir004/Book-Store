import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WishListCard from '../components/WishListCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    return (
        <div className="wishlist">
            <h1>My Wishlist</h1>
            {wishlist.length === 0 ? (
                <div className='empty-wishlist'>
                    <img src="/empty-wishlist.jpg" alt="no-books" />
                    <Link to="/">Go Back to HomaPage</Link>
                </div>
            ) : (
                wishlist.map(book => <div className='my-wishlist-page'><WishListCard key={book.id} book={book} /></div>)
            )}
        </div>
    );
};

export default Wishlist;
