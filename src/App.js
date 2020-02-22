import React, {useState} from 'react';
import './App.css';
import Header from './Header.js';
import Search from './Search';
import Footer from './Footer.js';

function App() {

  //Set the initial state

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  //Update query on user input

  function updateQuery(userQuery) {
    setQuery(userQuery);
  }

  //Query external api for artist name based on user input

  function queryDatabase() {

    fetch(`https://api.discogs.com/database/search?q=${query}&page=1&per_page=1&key=zMRtiWGGUaDpqSnajoth&secret=ETfHznfoZWHdomEtLyKqmsSDfPDzghIY`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setData(data.results[0])).then(error =>  setError(false))
      .catch(error =>  setError(true))
  }

  console.log(data);
  console.log(error);

  return (
    <div className="App">
      <Header />
      <Search updateQuery={updateQuery} queryDatabase={queryDatabase} hits={data} error={error}/>
      <Footer />
    </div>
  );
}

export default App;
