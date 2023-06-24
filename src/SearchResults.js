import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsHeader from './results/ResultsHeader';
import ResultsFooter from './results/ResultsFooter';
import ResultsDivider from './results/ResultsDivider';
import LoadingPost from './results/LoadingPost';

const baseUrl = 'http://localhost:3000'; // Server URL
const endpoint = baseUrl + '/';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const getResults = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
        setProfilePic(response.data.imageUrl[0]); // Profile pic in first position
        setImageUrls(response.data.imageUrl.slice(1)); // Remove profile pic from array

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, [username]);

  if (isLoading) {
    return <LoadingPost userHeader={username} />
  }

  // Need to send this data back to user results to remove from array.
  if (!displayData || !displayData.data || !displayData.data.graphql || !displayData.data.graphql.user) {
    console.log('No data available for ' + username);
  }

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="post-container">
          <ResultsHeader userHeader={username} profilePicUrl={`${baseUrl}/${username}/${encodeURIComponent(profilePic)}`} />
          <img className='post-image' src={`${baseUrl}/${username}/${encodeURIComponent(imageUrl)}`} alt={`${username} recent`} />
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
