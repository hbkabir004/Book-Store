import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { fetchBooks } from '../utils';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetchBooks().then(data => {
            const foundBook = data.results.find(book => book.id === parseInt(id));
            setBook(foundBook);
        });
    }, [id]);

    if (!book) return <div className='book-details-spinner'><Spinner /></div>;

    return (
        <div className="book-details">
            <img src={book.formats['image/jpeg']} alt={book.title} />
            <h1>{book.title}</h1>
            <p>Authors: {book.authors.map(author => author.name).join(', ')}</p>
            <p>ID: {book.id}</p>
            <p><strong>Find the Book on {book.bookshelves[0]}</strong></p>
            <small>&copy; {(book.copyright) ? 'Not Found' : 'Registered'} </small>

        </div>
    );
};

export default BookDetails;
