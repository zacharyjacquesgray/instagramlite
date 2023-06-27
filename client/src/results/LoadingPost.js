import React from 'react';
import ResultsHeader from './ResultsHeader';
import ResultsFooter from './ResultsFooter';

const LoadingPost = ({ userHeader }) => {

    // Display blank placeholders so that it appears that the posts are loading fast.
    return (
        <div className="post-container">
          <ResultsHeader userHeader={userHeader} profilePicUrl='loadingProfilePic.png' />
          <img className='post-image' src='loadingPost.png' alt={`Loading ${userHeader}...`} />
          <ResultsFooter userHeader={userHeader} caption='' likes='     ' />
          <br />
        </div>
    );
}

export default LoadingPost;