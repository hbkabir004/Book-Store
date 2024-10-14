import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

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
                <p>No books in wishlist.</p>
            ) : (
                wishlist.map(book => <BookCard key={book.id} book={book} />)
            )}
        </div>
    );
};

export default Wishlist;
