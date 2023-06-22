import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Information to reach API
const baseUrl = 'https://www.instagram.com/';
const queryParams = '/?__a=1&__d=dis';

const SearchResults = ({ username }) => {
    const endpoint = baseUrl + username + queryParams;
    const [displayData, setDisplayData] = useState({ data: "No data" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const jsonResponse = await response.json();
                    setDisplayData(jsonResponse);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
    }, []);

    if (isLoading) {
        return <p>Loading {username}...</p>
    }

    return <p>{JSON.stringify(displayData)}</p>
}

export default SearchResults;