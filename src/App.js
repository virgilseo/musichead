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
  const [eventsData, setEventsData] = useState([]);
  const [eventsError, setEventsError] = useState(false);

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

  //Search on ticket master database for artist name

    fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${query}&apikey=hkbdfMkgTS9PiqJdNMKdj5bg7aKGR4Wk&classificationName=music`)
    .then(response => {
      if (response.ok) {
        return response.json(response);
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setEventsData(data._embedded.attractions[0])).then(error =>  setEventsError(false))
      .catch(error =>  setEventsError(true));

  }

  console.log(eventsData);
  console.log(eventsError);

  //Clear search results and events data when user navigates back to the search page

  const clearSearch = () => {
    setData([]);
    setQuery('');
    setEventsData([]);
    localStorage.setItem('eventArtist', '');
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
          musixmatchArtist={relatedArtistData}
          relatedArtistError={setRelatedArtistError}
          ticketMasterArtist={eventsData}
          ticketMasterError={eventsError}
        />
      </Route>
    </div>
  );
}

export default App;
