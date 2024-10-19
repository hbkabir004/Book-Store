import React, { useState } from 'react';

const SearchBar = ({ value, handleSearch }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    console.log(value);


    return (
        <div style={{ border: "1px solid blue" }} className={`search ${isFocused ? 'active' : ''}`}>
            <input
                type="text"
                placeholder="Search..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={handleSearch}
            />
            <div className="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="lens"
                >
                    <path
                        d="M10 2a8 8 0 106.32 13.906l5.387 5.388a1 1 0 001.414-1.415l-5.387-5.388A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
