import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageParser from './ImageParser';

// Information to reach API
const baseUrl = 'http://localhost:3000'; // Update with your server's URL
const endpoint = baseUrl + '/';
const mediaJson = ''

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

  //return <p>{JSON.stringify(displayData, null, 2)}</p>;
  return (
    <div>
      <ImageParser json={JSON.stringify(displayData)} />
      <h3>{displayData.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url}</h3>
      <h3>{displayData.graphql.user.edge_owner_to_timeline_media.edges[1].node.display_url}</h3>
      <h3>{displayData.graphql.user.edge_owner_to_timeline_media.edges[2].node.display_url}</h3>
      <pre>{JSON.stringify(displayData, null, 2)}</pre>
    </div>
  );
};

export default SearchResults;
