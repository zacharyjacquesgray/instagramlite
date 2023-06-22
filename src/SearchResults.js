import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Information to reach API
const baseUrl = 'http://localhost:3000'; // Update with your server's URL
const endpoint = baseUrl + '/';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, [username]);

  if (isLoading) {
    return <p>Loading {username}...</p>;
  }

  return <p>{JSON.stringify(displayData, null, 2)}</p>;
};

export default SearchResults;
