import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, searchTitle = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUsernameIndex, setCurrentUsernameIndex] = useState(0);
    const [isInputFocused, setInputFocused] = useState(false);
    const [shouldChangePlaceholder, setShouldChangePlaceholder] = useState(true);
    const intervalRef = useRef(null);

    const exampleUsernames = ['jennierubyjane', 'lalalalisa_m', 'sooyaaa__', 'roses_are_rosie', 'blackpinkofficial'];
    const inputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
        const filteredSearch = searchTerm.split('').filter(char => /[a-zA-Z0-9._]/.test(char)).join('').toLowerCase();
        onSearch(filteredSearch);
        setShouldChangePlaceholder(false);
    }

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setShouldChangePlaceholder(false);
    }

    const handleInputFocus = () => {
        setInputFocused(true);
        setShouldChangePlaceholder(false);
    }

    const handleInputBlur = () => {
        setInputFocused(false);
        setShouldChangePlaceholder(true);
    }

    const handleInputPrompt = () => {
        if (shouldChangePlaceholder) {
            const nextIndex = Math.floor(Math.random() * exampleUsernames.length);
            setCurrentUsernameIndex(nextIndex);
        }
    }

    useEffect(() => {
        if (shouldChangePlaceholder) {
            intervalRef.current = setInterval(handleInputPrompt, 7000);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [shouldChangePlaceholder]);

    useEffect(() => {
        if (!isInputFocused) {
            inputRef.current.value = searchTerm;
        }
    }, [searchTerm, isInputFocused]);

    const handleTyping = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                className="search-bar"
                key={`user${currentUsernameIndex + 1}`}
                value={searchTerm}
                placeholder={isInputFocused ? '' : `Search "${exampleUsernames[currentUsernameIndex]}"`}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                onInput={handleTyping}
            />
            <button type="submit" className="search-button">
                <img src="search.png" alt="Search" />
            </button>
        </form>
    );
}

export default SearchBar;
