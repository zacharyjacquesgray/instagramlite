import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

const UserResults = ({ username }) => {
    const [userHandle, setUserHandle] = useState([]); // Initialise useState with cloud/cached users.

    // need to handle if username doesn't exist



    // Add username to array of users to display
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

    // Return each user's image results
    return (
        <div>
            {userHandle.map((user) => (
                <SearchResults username={user} key={user} />
            ))}
        </div>
    );
}

export default UserResults;
