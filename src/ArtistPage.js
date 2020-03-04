import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Discogs from './Discogs.js';

function ArtistPage(props) {

  //Set initial state

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [releases, setReleases] = useState([]);

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

    fetch(`https://api.discogs.com//artists/${props.hits.id}/releases?page=1&per_page=100&sort=year&sort_order=asc`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
     })
      .then(data => setReleases(data.releases)).then(error => setError(false))
      .catch(error => setError(true))

  }, [props.hits.id])

  console.log(data);
  console.log(error);
  console.log(props.hits.id);
  console.log(releases);


  return (
    <div>
      <Link to='/'>
        <i className='material-icons'>arrow_back</i>
      </Link>
      <Discogs
        data={data}
        error={error}
        releases={releases}
      />
    </div>
  );
}

export default ArtistPage;
