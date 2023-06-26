import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsHeader from './results/ResultsHeader';
import ResultsFooter from './results/ResultsFooter';
import ResultsDivider from './results/ResultsDivider';
import LoadingPost from './results/LoadingPost';
import { getUserData } from './results/GetUserData';

const baseUrl = 'http://localhost:3001'; // Server URL
const endpoint = baseUrl + '/';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const getResults = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
        setProfilePic(response.data.imageUrl[0]); // Profile pic in first position
        setImageUrls(response.data.imageUrl.slice(1,7)); // Remove profile pic from array and select first few images (too many = too many API requests)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, [username]);

  /*useEffect(() => {
    if (displayData && displayData.data.graphql) {
      const userData = getUserData(displayData);
      setProfileName(userData.name);
      console.log('Use effect displayData' + displayData);
      console.log('Use effect displayData' + userData);
    }
  }, [displayData]);*/

  if (isLoading) {
    return <LoadingPost userHeader={username} />
  }

  // Need to send this data back to user results to remove from array.
  if (!displayData || !displayData.data.graphql) {
    console.log('No data available for ' + username);
    return null;
  }

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="post-container">
          <ResultsHeader userHeader={displayData.data.graphql.user.full_name} profilePicUrl={`${baseUrl}/${username}/${encodeURIComponent(profilePic)}`} />
          <img className='post-image' src={`${baseUrl}/${username}/${encodeURIComponent(imageUrl)}`} alt={`${username} recent`} />
          <ResultsFooter />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};


export default SearchResults;


// use this code to display JSON if needed:
// <pre>{JSON.stringify(displayData, null, 2)}</pre>
