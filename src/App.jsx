import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import BookDetails from './pages/BookDetails';
import HomePage from './pages/HomePage';
import Wishlist from './pages/Wishlist';
import './styles/styles.css';

const App = () => {
  const [loading, setLoading] = useState(true); // Spinner shows by default
  const [data, setData] = useState([]); // Store fetched data

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('https://gutendex.com/books/');
        const result = await response.json();
        setData(result); // Save data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      {loading &&
        (<div className="pos-center">
          <Spinner />
        </div>)} {/* Conditionally show spinner */}
      {!loading && ( // Render Routes only after loading is complete
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
