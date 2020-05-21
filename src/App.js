import React, {useState} from 'react';
import './App.css';
import Header from './Header.js';
import Search from './Search';
import Footer from './Footer.js';
import {Route} from 'react-router-dom';
import ArtistPage from './ArtistPage.js';

function App() {

  //Set the initial state

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [discogsError, setDiscogsError] = useState(false)
  const [relatedArtistData, setRelatedArtistData] = useState([])
  const [relatedArtistError, setRelatedArtistError] = useState(false)
  const [eventsData, setEventsData] = useState([])
  const [eventsError, setEventsError] = useState(false)
  const [discogsLoader, setDiscogsLoader] = useState(false)
  const [relatedLoader, setRelatedLoader] = useState(false)
  const [eventsLoader, setEventsLoader] = useState(false)

  //Update query on user input

  function updateQuery(userQuery) {
    setQuery(userQuery);
  }

  //Query external api for artist name based on user input

  function queryDatabase() {

    const axios = require('axios')

   //Clear descogs data

    setData([])
    
   //Enable loaders

    setDiscogsLoader(true)
    setRelatedLoader(true)
    setEventsLoader(true)

   //Reset error variables

    setDiscogsError(false)
    setEventsError(false)
    setRelatedArtistError(false)

    //Search on discogs database for artist by name

    axios.get(`https://api.discogs.com/database/search?q=${query}&page=1
      &per_page=1&key=zMRtiWGGUaDpqSnajoth&secret=ETfHznfoZWHdomEtLyKqmsSDfPDzghIY`)
      .then(response => setData(response.data.results[0]))
      .catch(error =>  setDiscogsError(true))
      .finally(() => setDiscogsLoader(false))


  //Search on musixmatch database for artist by name

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/
      ws/1.1/artist.search?q_artist=${query}&page_size=1&apikey=460e6f530ef1588d40304db0a3596ab4`)
      .then(response => setRelatedArtistData(response.data.message.body.artist_list[0].artist))
      .catch(error =>  setRelatedArtistError(true))
      .finally(() => setRelatedLoader(false))

  //Search on ticket master database for artist name

    axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=
      ${query}&apikey=hkbdfMkgTS9PiqJdNMKdj5bg7aKGR4Wk&classificationName=music`)
      .then(response => setEventsData(response.data._embedded ?
        response.data._embedded.attractions[0] : response))
      .catch(error =>  setEventsError(true))
      .finally(() => setEventsLoader(false))
  }

  console.log(eventsData)
  console.log(eventsError)
  console.log(data)

  //Clear search results and events data when user navigates back to the search page

  const clearSearch = () => {
    setData([])
    setQuery('')
    setEventsData([])
    localStorage.setItem('eventArtist', '')

    //Reset error variables

     setDiscogsError(false)
     setEventsError(false)
     setRelatedArtistError(false)
  }


  return (
    <div className="App">
      <Route exact path='/'>
        <Header />
        <Search
          updateQuery={updateQuery}
          queryDatabase={queryDatabase}
          discogsData={data}
          discogsError={discogsError}
          relatedArtistError={relatedArtistError}
          eventsError={eventsError}
          eventsData={eventsData}
          discogsLoader={discogsLoader}
          relatedLoader={relatedLoader}
          eventsLoader={eventsLoader}
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
