import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import DropdownFilter from '../components/DropdownFilter';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { fetchBooks } from '../utils';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlist, setWishlist] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchBooks();
            setBooks(data.results);
            setFilteredBooks(data.results);
        };
        loadBooks();
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

    const handleFilterChange = (genre) => {
        setSelectedGenre(genre);
        filterBooks(searchQuery, genre);
        setCurrentPage(1);
    };

    const filterBooks = (query, genre) => {
        const filtered = books.filter((book) => {
            const matchesGenre = genre ? book.subjects.includes(genre) : true;
            const matchesSearch = book.title.toLowerCase().includes(query.toLowerCase());
            return matchesGenre && matchesSearch;
        });
        setFilteredBooks(filtered);
    };

    const genres = [...new Set(books.flatMap((book) => book.subjects))];

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
            <div className='sorting-searching'>
                <SearchBar
                    value={searchQuery}
                    handleSearch={handleSearch} />
                <DropdownFilter genres={genres} onFilterChange={handleFilterChange} />
            </div>

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
                totalBooks={books.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default HomePage;
