import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsHeader from './results/ResultsHeader';
import ResultsFooter from './results/ResultsFooter';
// import ResultsDivider from './results/ResultsDivider';
import LoadingPost from './results/LoadingPost';

//const baseUrl = 'https://us-central1-instagram-lite-cefae.cloudfunctions.net/api'; // Server URL
const baseUrl = 'http://localhost:3001'; // Server URL
const endpoint = baseUrl + '/';

const SearchResults = ({ username }) => {
  const [displayData, setDisplayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState(username);
  const [isVerified, setIsVerified] = useState(false);
  const [isVideo, setIsVideo] = useState([]);
  const [caption, setCaption] = useState([]);
  const [likes, setLikes] = useState(null);
  const [location, setLocation] = useState([]);

  useEffect(() => {

    const getResults = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${endpoint}${username}`);
        setDisplayData(response.data);
        setProfilePic(response.data.imageUrl[0]); // Profile pic in first position
        setImageUrls(response.data.imageUrl.slice(1, 11)); // Remove profile pic from array and select first few images (too many = too many API requests)
        (username !== 'jennierubyjane') ? setName(response.data.data.graphql.user.full_name || username) : setName('Jennie 🥰');
        setIsVerified(response.data.isVerified);
        setIsVideo(response.data.isVideo);
        setCaption(response.data.caption);
        setLikes(response.data.likes);
        setLocation(response.data.location);
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
  if (!displayData || !displayData.data.graphql) {
    console.log('No data available for ' + username);
    return null;
  }

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="post-container">
          <ResultsHeader userHeader={name} profilePicUrl={`${baseUrl}/img/${username}/${encodeURIComponent(profilePic)}`} />
          <img className='post-image' src={`${baseUrl}/img/${username}/${encodeURIComponent(imageUrl)}`} alt={`${username} recent`} />
          <ResultsFooter userHeader={username} caption={caption[index]} likes={likes[index]} />
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