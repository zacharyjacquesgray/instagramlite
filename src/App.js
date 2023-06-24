import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';
import UserResults from './UserResults';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('jennierubyjane');

  const handleUsername = (usernameSearch) => {
    console.log('Search user: ' + usernameSearch);
    setUsername(usernameSearch);
  }

  return (
    <div className='App'>
      <header className='App-header' >
        <HeaderBar />
        <div>
          <SearchBar 
            onSearch={handleUsername}
            searchTitle='Search username'
          />
          <br></br>
          <UserResults username={username}/>
        </div>
        </header>
    </div>


  );
}

export default App;
