import React from 'react';
import useFetch from './useFetch.js';

function Releases(props) {

  //Fetch artist releases from discogs api

  const res = useFetch(`https://api.discogs.com//artists/${props.discogsArtistId}/releases?page=1&per_page=500&sort=year&sort_order=asc`)

  console.log(res.response ? res.response.data.releases : undefined)
  //Render artist releases on the page with loader and proper error handeling

  return(
    <div>
      <h3>Discography</h3>
      {res.error && (
        <p>Something went wrong. Please try again later</p>
      )}
      {res.loading && (
        <p>Loading...</p>
      )}
      {res.response && (
        <ul>
          {res.response.data.releases.filter( release => release.role === "Main")
          .map((release, index) => (
            <li key={index}>
              <p>{release.artist}</p>
              <p>{release.title}</p>
              <p>{release.year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Releases;
