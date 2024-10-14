import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const { id, title, authors, formats } = book;
    const coverImage = formats['image/jpeg'];

    return (
        <div className="book-card">
            <img src={coverImage} alt={title} className="book-cover" />
            <h2>{title}</h2>
            <p>Author: {authors.map(author => author.name).join(', ')}</p>
            <Link to={`/book/${id}`} className="details-link">View Details</Link>
        </div>
    );
};

export default BookCard;
