import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    if (!book) return <p>Loading...</p>;

    return (
        <div className="book-details">
            <img src={book.formats['image/jpeg']} alt={book.title} />
            <h1>{book.title}</h1>
            <p>Authors: {book.authors.map(author => author.name).join(', ')}</p>
            <p>ID: {book.id}</p>
        </div>
    );
};

export default BookDetails;
