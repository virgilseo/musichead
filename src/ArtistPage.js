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
  const [eventsError, setEventsError] = useState(false);

  //Fetch artist information from the discogs api

  useEffect(() => {

    fetch(`https://api.discogs.com/artists/${props.hits.id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setData(data)).then(error => setError(false))
      .catch(error => setError(true))

  }, [props.hits.id])

// Fetch artist discography from discogs api

  useEffect(() => {

    fetch(`https://api.discogs.com//artists/${props.hits.id}/releases?page=1&per_page=500&sort=year&sort_order=asc`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setReleases(data.releases.filter(release => release.role === 'Main'))).then(error => setError(false))
      .catch(error => setError(true))

  }, [props.hits.id])

  // Fetch artist events from ticket master api

  useEffect(() => {

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=hkbdfMkgTS9PiqJdNMKdj5bg7aKGR4Wk&keyword=${props.query}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setEventsData(data)).then(error => setEventsError(false))
      .catch(error => setEventsError(true))
  }, [props.query])

  console.log(data);
  console.log(discogsError);
  console.log(props.hits.id);
  console.log(releases);
  console.log(eventsData);


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
      {eventsError === true ? (
        <p>Something went wrong. Please try again later.</p>
      ) : (
        <Events
          events={eventsData}
        />
      )}
  </div>
  );
}

export default ArtistPage;
