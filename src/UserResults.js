import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

const UserResults = ({ username }) => {
  const [userHandle, setUserHandle] = useState([]);

  useEffect(() => {
    setUserHandle((prev) => {
      if (!prev.includes(username)) {
        const updatedUserHandle = [username, ...prev];
        console.log(updatedUserHandle);
        return updatedUserHandle;
      }
      return prev;
    });
  }, [username]);

  return (
    <div>
      {userHandle.map((user) => (
        <SearchResults username={user} key={user} />
      ))}
    </div>
  );
}

export default UserResults;
