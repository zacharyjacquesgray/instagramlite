import logo from './logo.svg';
import './App.css';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

function App() {
  return (
    <div className='App'>
      <header className='App-header' >
        <HeaderBar title='Instagram Lite' />
        <div>
          <SearchBar />
          <br></br>
          <SearchResults />
        </div>
        </header>
    </div>


  );
}

export default App;
