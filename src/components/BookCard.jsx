
const BookCard = ({ book, isWishlisted, onToggleWishlist }) => {
    const { id, title, authors, formats, subjects } = book;

    const coverImage = formats['image/jpeg'];
    const genre = subjects[0]
    const author = authors[0];

    return (
        <div className="card">
            <img src={coverImage} alt={title} />
            <h2>{title}</h2>
            <div style={{ textAlign: "left" }}>
                <p><b>Author Name: </b>{author.name}</p>
                <p><b>Genre: </b>{genre}</p>
                <p><b>Book ID: </b>{id}</p>
            </div>

            <button>Read More</button>
            <button className="wishlist-button" onClick={onToggleWishlist}>
                {isWishlisted ? '❤️' : '🤍'}
            </button>
        </div>
    );
};

export default BookCard;
