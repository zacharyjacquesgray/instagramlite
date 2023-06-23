import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageParser from './ImageParser';

const baseUrl = 'http://localhost:3000'; // Server URL
const endpoint = baseUrl + '/';
const mediaJson = '';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
        setImageUrl(`${baseUrl}/${username}/image`); // Set the imageUrl from the response data
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

  if (!displayData || !displayData.data || !displayData.data.graphql || !displayData.data.graphql.user) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <ImageParser json={JSON.stringify(displayData)} />

      <img src={imageUrl} alt="Instagram Image" />

      <h3>{displayData.data.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url}</h3>
      <h3>{displayData.data.graphql.user.edge_owner_to_timeline_media.edges[1].node.display_url}</h3>
      <h3>{displayData.data.graphql.user.edge_owner_to_timeline_media.edges[2].node.display_url}</h3>
      <h4>{imageUrl}</h4>
      <pre>{JSON.stringify(displayData, null, 2)}</pre>
    </div>
  );
};

export default SearchResults;
