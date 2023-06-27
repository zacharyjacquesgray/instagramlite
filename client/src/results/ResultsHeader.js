import React from 'react';

const ResultsHeader = ({ userHeader, profilePicUrl }) => {
  return (
    <div className="header-rectangle">
      <div className="profile-pic">
        <img src={profilePicUrl} alt="" />
      </div>
      <h4 className="user-header">{userHeader}</h4>
    </div>
  );
};

export default ResultsHeader;
