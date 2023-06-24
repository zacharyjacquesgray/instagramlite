import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchTitle = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        const filteredSearch = searchTerm.split('').filter(char => /[a-zA-Z0-9._]/.test(char)).join('');
        onSearch(filteredSearch);
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // Add this to .css file later
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const ButtonStyling = { background: "#F2F1F9", border: "none", padding: "0.5rem" };
    
    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                style={BarStyling}
                key="user1"
                value={searchTerm}
                placeholder={searchTitle}
                onChange={handleInputChange}
            />
            <button type="submit" style={ButtonStyling}>Go!</button>
        </form>
    );
}


export default SearchBar;

