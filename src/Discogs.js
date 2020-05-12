import React from 'react';
import useFetch from './useFetch.js';


function Discogs(props) {

  //Fetch artist information from disgogs api

  const res = useFetch(`https://api.discogs.com/artists/${props.discogsArtistId}`)

  // Display artist information(biography and web links)
  // on the page uisng information from the discogs api

  return(
    <div className='discogs-container'>
    {res.error && (
      <p>Something went wrong. Please try again later.</p>
    )}
    {res.loading && (
      <p>Loading...</p>
    )}
    {res.response && (
      <section>
      {res.response.data.profile && (
        <section>
          <h3>Bio</h3>
          <p>{res.response.data.profile.replace(/a=|[[]|m=|l=|/g, '').replace(/[[b]]|[/]|]/g, '')}</p>
        </section>
      )}
      {res.response.data.realname && (
        <section>
          <h3>Real name</h3>
          <p>{res.response.data.realname}</p>
        </section>
      )}
      {res.response.data.members && (
        <section>
          <h3>Band members</h3>
            <ul>
              {res.response.data.members.map((member, index) => (
                <li key={index}>{member.name}</li>
              ))}
            </ul>
        </section>
      )}
      {res.response.data.urls && (
        <section>
          <h3>On the web</h3>
            <ul>
              {res.response.data.urls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel='noopener noreferrer'>{url}</a>
                </li>
              ))}
            </ul>
        </section>
      )}
      </section>
    )}
   </div>
  )
}

export default Discogs
