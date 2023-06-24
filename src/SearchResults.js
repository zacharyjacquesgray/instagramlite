import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageParser from './ImageParser';
import ResultsHeader from './results/ResultsHeader';
import ResultsFooter from './results/ResultsFooter';
import ResultsDivider from './results/ResultsDivider';

const baseUrl = 'http://localhost:3000'; // Server URL
const endpoint = baseUrl + '/';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
        setImageUrls(response.data.imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, [username]);

  const fetchImage = async (url) => {
    try {
      await axios.get(`${endpoint}${username}/${encodeURIComponent(url)}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <p>Loading {username}...</p>;
  }

  if (!displayData || !displayData.data || !displayData.data.graphql || !displayData.data.graphql.user) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <ImageParser json={JSON.stringify(displayData)} />

      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <ResultsHeader userHeader={username} />
          <img src={`${baseUrl}/${username}/${encodeURIComponent(imageUrl)}`} alt={`${username} recent`} />
          <ResultsFooter />
          <br />
          <ResultsDivider />
          <br />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;


// use this code to display JSON if needed:
// <pre>{JSON.stringify(displayData, null, 2)}</pre>
