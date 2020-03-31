import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Discogs from './Discogs.js';
import Events from './Events.js';
import RelatedArtists from './RelatedArtists.js'

function ArtistPage(props) {

  //Set initial state

  const [data, setData] = useState([]);
  const [discogsError, setError] = useState(false);
  const [releases, setReleases] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [eventsError, setEventsError] = useState('');
  const [relatedArtists, setRelatedArtist] = useState([]);
  const [relatedArtistsError, setRelatedArtistError] = useState(false);

  //Store discogs artist id in local storage

  if (props.hits.id ) {
    localStorage.setItem('artist', props.hits.id);
  }

  // Store musixmatch artist id in local storage

  if (props.musixmatchArtist.artist_id)  {
    localStorage.setItem('relatedArtist',props.musixmatchArtist.artist_id);
  }

  //Get query and artist id from local storage and store them in variables

  const localQuery = localStorage.getItem('query');
  const localArtistId = localStorage.getItem('artist');
  const localRelatedArtistId = localStorage.getItem('relatedArtist');


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

  //Fetch related artist from musixmatch api

  useEffect(() => {

    fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=${localRelatedArtistId}&page_size=10&page=1&apikey=460e6f530ef1588d40304db0a3596ab4`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setRelatedArtist(data.message.body.artist_list)).then(error => setRelatedArtistError(false))
      .catch(error => setRelatedArtistError(true))
  }, [localRelatedArtistId])



  console.log(relatedArtists);
  console.log(relatedArtistsError);
  console.log(props.musixmatchArtist);
  console.log(localRelatedArtistId);


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
      {relatedArtists.length > 0  && (
        <RelatedArtists
         relatedArtist={relatedArtists}
         error={relatedArtistsError}
        />
      )}
  </div>
  );
}

export default ArtistPage;
