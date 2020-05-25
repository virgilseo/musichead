import React, {useState} from 'react';
import useFetch from './useFetch.js';
import Release from './Release.js';

function Releases(props) {

  //Set the initial state

  const [artistRelease, setArtistRelease] = useState([])
  const [releaseLoader, setReleaseLoader] = useState(false)
  const [releaseError, setReleaseError] = useState(false)
  const [loaderId, setLoaderId] = useState('')
  const [errorId, setErrorId] = useState('')


  //Fetch artist releases from discogs api

  const res = useFetch(`https://api.discogs.com//artists/${props.discogsArtistId}/releases?page=1&per_page=500&sort=year&sort_order=asc`)

 //Get additional information about the release from teh discogs api on user input

  function showRelease (releaseId) {

    //Clear previous release data

    setArtistRelease([])

    //Enable loader

    setReleaseLoader(true)

    //Set loader and error id

    setLoaderId(releaseId)
    setErrorId(releaseId)

    setReleaseError(false)

    let currentRelease = res.response.data.releases
    .filter(release => release.id === releaseId)

    // Fetch additional information about current realease from the discogs api

    const axios = require('axios')

    axios.get(currentRelease[0].resource_url)
    .then(response => setArtistRelease(response.data))
    .catch(error => setReleaseError(true))
    .finally(() => setReleaseLoader(false))
  }

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
          .map((release) => (
            <li key={release.id}>
              <p>{release.artist}</p>
              <p>{release.title}</p>
              <p>{release.year}</p>
              <Release
                showRelease={showRelease}
                releaseId={release.id}
                releaseData={artistRelease}
                error={releaseError}
                loader={releaseLoader}
                loaderId={loaderId}
                errorId={errorId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Releases;
