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

    // Load initial data from localStorage and API
    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchBooks();
            setBooks(data.results);
            setFilteredBooks(data.results);
        };

        // Retrieve stored preferences on load
        const storedSearchQuery = localStorage.getItem('searchQuery') || '';
        const storedSelectedGenre = localStorage.getItem('selectedGenre') || '';
        const storedCurrentPage = parseInt(localStorage.getItem('currentPage')) || 1;

        setSearchQuery(storedSearchQuery);
        setSelectedGenre(storedSelectedGenre);
        setCurrentPage(storedCurrentPage);

        loadBooks();
    }, []);

    // Filter books whenever searchQuery or selectedGenre changes
    useEffect(() => {
        filterBooks(searchQuery, selectedGenre);
    }, [books, searchQuery, selectedGenre]);

    // Save search and filter preferences to localStorage
    useEffect(() => {
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('selectedGenre', selectedGenre);
        localStorage.setItem('currentPage', currentPage);
    }, [searchQuery, selectedGenre, currentPage]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const handleFilterChange = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1); // Reset to page 1 on filter change
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

    // Load wishlist from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (book) => {
        if (wishlist.some((item) => item.id === book.id)) {
            setWishlist(wishlist.filter((item) => item.id !== book.id));
        } else {
            setWishlist([...wishlist, book]);
        }
    };

    return (
        <div className="home">
            <div className='sorting-searching'>
                <SearchBar
                    value={searchQuery}
                    handleSearch={handleSearch}
                />
                <DropdownFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onFilterChange={handleFilterChange}
                />
            </div>

            <div className="grid-container">
                {filteredBooks.slice((currentPage - 1) * 10, currentPage * 10).map((book) => (
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

export default HomePage;
