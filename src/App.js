import React, {useState} from 'react';
import './App.css';
import Header from './Header.js';
import Search from './Search';
import Footer from './Footer.js';
import {Route} from 'react-router-dom';
import ArtistPage from './ArtistPage.js';

function App() {

  //Set the initial state

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [relatedArtistData, setRelatedArtistData] = useState([]);
  const [relatedArtistError, setRelatedArtistError] = useState(false);

  //Update query on user input

  function updateQuery(userQuery) {
    setQuery(userQuery);
  }

  //Query external api for artist name based on user input

  function queryDatabase() {

    //Search on discogs database for artist by name

    fetch(`https://api.discogs.com/database/search?q=${query}&page=1&per_page=1&key=zMRtiWGGUaDpqSnajoth&secret=ETfHznfoZWHdomEtLyKqmsSDfPDzghIY`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setData(data.results[0])).then(error =>  setError(false))
      .catch(error =>  setError(true));

  //Search on musixmatch database for artist by name

    fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${query}&page_size=1&apikey=460e6f530ef1588d40304db0a3596ab4`)
    .then(response => {
      if (response.ok) {
        return response.json(response);
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setRelatedArtistData(data.message.body.artist_list[0].artist)).then(error =>  setRelatedArtistError(false))
      .catch(error =>  setRelatedArtistError(true));


    //Store query in local storage
    localStorage.setItem('query', query);
  }


  console.log(data);
  console.log(error);
  console.log(query);
  console.log(relatedArtistData);
  console.log(relatedArtistError);



  //Clear search results when user navigates back to the search page

  const clearSearch = () => {
    setData([]);
    setQuery('');
  }


  return (
    <div className="App">
      <Route exact path='/'>
        <Header />
        <Search
          updateQuery={updateQuery}
          queryDatabase={queryDatabase}
          hits={data}
          error={error}
          query={query}
        />
        <Footer />
      </Route>
      <Route path='/results'>
        <ArtistPage
          hits={data}
          clearSearch={clearSearch}
          query={query}
          musixmatchArtistId={relatedArtistData.id}
          relatedArtistError={setRelatedArtistError}
        />
      </Route>
    </div>
  );
}

export default App;
