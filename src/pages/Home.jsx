import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { fetchBooks } from '../utils';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchBooks().then(data => {
            setBooks(data.results);
            setFilteredBooks(data.results);
        });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="home">
            <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />
            <Pagination
                currentPage={currentPage}
                totalBooks={filteredBooks.length}
                onPageChange={handlePageChange}
            />
            <div className="book-list">
                {filteredBooks.slice((currentPage - 1) * 10, currentPage * 10).map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;
