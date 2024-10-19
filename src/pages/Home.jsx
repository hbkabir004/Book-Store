import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
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

    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage when the app mounts
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    // Save the wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Toggle book in wishlist
    const toggleWishlist = (book) => {
        if (wishlist.find((item) => item.id === book.id)) {
            setWishlist(wishlist.filter((item) => item.id !== book.id)); // Remove from wishlist
        } else {
            setWishlist([...wishlist, book]); // Add to wishlist
        }
    };


    return (
        <div className="home">
            <SearchBar
                value={searchQuery}
                handleSearch={handleSearch} />

            <div className="grid-container">
                {filteredBooks.slice((currentPage - 1) * 10, currentPage * 10).map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        isWishlisted={wishlist.some((item) => item.id === book.id)}
                        onToggleWishlist={() => toggleWishlist(book)}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalBooks={filteredBooks.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Home;
