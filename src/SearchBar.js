import React from 'react';

const SearchBar = ({ searchTitle="Search..." }) => {


    return (
        <div>
            <input placeholder={searchTitle} />
        </div>
    )
}

export default SearchBar;