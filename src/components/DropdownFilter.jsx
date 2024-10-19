import React from 'react';

const DropdownFilter = ({ genres, onFilterChange }) => {
    return (
        <div className="dropdown-filter">
            <select onChange={(e) => onFilterChange(e.target.value)}>
                <option value="">All Genres</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownFilter;
