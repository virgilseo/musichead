import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Discogs from './Discogs.js';
import Events from './Events.js';

function ArtistPage(props) {

  //Set initial state

  const [data, setData] = useState([]);
  const [discogsError, setError] = useState(false);
  const [releases, setReleases] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [eventsError, setEventsError] = useState('');

  //Store artist id in local storage

  if (props.hits.id ) {
    localStorage.setItem('artist', props.hits.id)
  }
  
  //Get query and artist id from local storage and store them in variables

  const localQuery = localStorage.getItem('query');
  const localArtistId = localStorage.getItem('artist');


  //Fetch artist information from the discogs api

  useEffect(() => {

    fetch(`https://api.discogs.com/artists/${localArtistId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setData(data)).then(error => setError(false))
      .catch(error => setError(true))

  }, [localArtistId])

// Fetch artist discography from discogs api

  useEffect(() => {

    fetch(`https://api.discogs.com//artists/${localArtistId}/releases?page=1&per_page=500&sort=year&sort_order=asc`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setReleases(data.releases.filter(release => release.role === 'Main'))).then(error => setError(false))
      .catch(error => setError(true))

  }, [localArtistId])

  // Fetch artist events from ticket master api

  useEffect(() => {

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=hkbdfMkgTS9PiqJdNMKdj5bg7aKGR4Wk&keyword=${localQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setEventsData(data._embedded.events)).then(error => setEventsError(false))
      .catch(error => setEventsError(true))
  }, [localQuery])

  // Filter out events that are not related to music
  const filteredEvents = eventsData.filter((event) => event.classifications).filter((event) => event.classifications[0].segment.name === 'Music');

  console.log(data);
  console.log(discogsError);
  console.log(props.hits.id);
  console.log(releases);
  console.log(eventsData);
  console.log(eventsError);
  console.log(filteredEvents)
  console.log(localQuery);
  console.log(localArtistId);


  return (
    <div>
      <Link to='/'>
        <i className='material-icons' onClick={props.clearSearch}>arrow_back</i>
      </Link>
      {discogsError === true ? (
        <p>Something went wrong. Please try again later.</p>
      ) : (
        <Discogs
          data={data}
          releases={releases}
        />
      )}
      {eventsData.length > 0 && (
        <Events
          events={filteredEvents}
        />
      )}
  </div>
  );
}

export default ArtistPage;
