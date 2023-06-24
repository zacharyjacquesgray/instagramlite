import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';
import UserResults from './UserResults';
import NavigationBar from './NavigationBar';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('jennierubyjane');

  const handleUsername = (usernameSearch) => {
    console.log('Search user: ' + usernameSearch);
    setUsername(usernameSearch);
  }

  return (
  <div className='App'>
    <header className='App-header'>
      <HeaderBar />
      <div className="search-navigation-container">
        <span className="search-bar-container">
          <SearchBar 
            onSearch={handleUsername}
            searchTitle='Search username'
          />
        </span>
        <NavigationBar />
      </div>
      <br />
      <UserResults username={username}/>
    </header>
  </div>
);

  
}

export default App;
