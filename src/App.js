import logo from './logo.svg';
import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
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
        <HeaderBar title='Instagram Lite' />
        <div>
          <SearchBar 
            onSearch={handleUsername}
            searchTitle='Search username'
          />
          <br></br>
          <SearchResults username={username} />
        </div>
        </header>
    </div>


  );
}

export default App;
