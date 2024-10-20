// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalBooks, onPageChange }) => {
    const totalPages = Math.ceil(totalBooks / 8);
    console.log("onPageChange", onPageChange);


    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) onPageChange(page);
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                {`<<`}
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                {`>>`}
            </button>
        </div>
    );
};

export default Pagination;
