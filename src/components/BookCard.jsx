
const BookCard = ({ book }) => {
    const { id, title, authors, formats, subjects } = book;

    const coverImage = formats['image/jpeg'];
    const description = subjects[0]
    const author = authors[0];
    // console.log(author.name);

    return (
        <div className="card">
            <img src={coverImage} alt={title} />
            <h2>{title}</h2>
            <p>{authors?.author?.name}</p>
            <p>{description}</p>
            <button>Read More</button>
        </div>
    );
};

export default BookCard;
