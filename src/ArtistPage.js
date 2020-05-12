import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Discogs from './Discogs.js';
import Events from './Events.js';
import RelatedArtists from './RelatedArtists.js';
import Releases from './Releases.js';

function ArtistPage(props) {

  //Set initial state

  const [data, setData] = useState([]);
  const [discogsError, setError] = useState(false);
  
  //Store discogs artist id in local storage

  if (props.hits.id ) {
    localStorage.setItem('artist', props.hits.id);
  }

  // Store musixmatch artist id in local storage

  if (props.musixmatchArtist.artist_id)  {
    localStorage.setItem('relatedArtist', props.musixmatchArtist.artist_id);
  }

  //Store ticket master artist id in local local storage

  if (props.ticketMasterArtist.id ) {
    localStorage.setItem('eventArtist', props.ticketMasterArtist.id)
  }

  //Get artist id's from local storage and store them in variables

  const localArtistId = localStorage.getItem('artist');
  const localRelatedArtistId = localStorage.getItem('relatedArtist');
  const localEventArtistId = localStorage.getItem('eventArtist');


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
        />
      )}
      <Releases
        discogsArtistId={localArtistId}
      />
      <Events
        eventsArtistId={localEventArtistId}
      />
      <RelatedArtists
        relatedArtistId={localRelatedArtistId}
      />
  </div>
  );
}

export default ArtistPage;
