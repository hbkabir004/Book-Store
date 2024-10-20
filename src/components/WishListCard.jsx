import { motion } from 'framer-motion'; // For smooth animations
import React from 'react';
import { Link } from 'react-router-dom';

const WishListCard = ({ book, isWishlisted, onToggleWishlist }) => {
    const { id, title, authors, formats, subjects } = book;

    const coverImage = formats['image/jpeg'];
    const genre = subjects[0]
    const author = authors[0];
    return (
        <motion.div
            className="wishlist-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* <div className="wishlist-card"> */}
            <img src={coverImage} alt={title} />
            <h3>{title}</h3>
            <div>
                <p><strong>Author Name: </strong>{author?.name}</p>
                <p><strong>Genre: </strong>{genre}</p>
                <p><strong>Book ID: </strong>{id}</p>
            </div>

            <Link to={`/book/${id}`}>
                <button>Read More</button>
            </Link>
            <button className="wishlist-button" onClick={onToggleWishlist}>
                {isWishlisted ? '❤️' : '🤍'}
            </button>
            {/* </div> */}
        </motion.div>
    );
};

export default WishListCard;