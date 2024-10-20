import { motion } from 'framer-motion'; // For smooth animations
import { Link } from "react-router-dom";

const BookCard = ({ book, isWishlisted, onToggleWishlist }) => {
    const { id, title, authors, formats, subjects } = book;

    const coverImage = formats['image/jpeg'];
    const genre = subjects[0]
    const author = authors[0];

    return (
        <motion.div
            className="book-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div style={{ height: '500px' }} className="card wishlist-card">
                <img src={coverImage} alt={title} />
                <h2>{title}</h2>
                <div style={{ textAlign: "left" }}>
                    <p><b>Author Name: </b>{author?.name}</p>
                    <p><b>Genre: </b>{genre}</p>
                    <p><b>Book ID: </b>{id}</p>
                </div>

                <Link to={`/book/${id}`}>
                    <button>Read More</button>
                </Link>
                <button className="wishlist-button" onClick={onToggleWishlist}>
                    {isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>
        </motion.div>
    );
};

export default BookCard;
