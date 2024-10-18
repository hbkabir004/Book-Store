const Pagination = ({ currentPage, totalBooks, onPageChange }) => {
    const totalPages = Math.ceil(totalBooks / 10);

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {`<<`}
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {`>>`}
            </button>
        </div>
    );
};

export default Pagination;
