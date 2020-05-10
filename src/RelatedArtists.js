import React from 'react';
import useFetch from './useFetch.js'

function RelatedArtist(props) {

  //Fetch related artist from musixmatch api

  const res = useFetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=${props.relatedArtistId}&page_size=10&page=1&apikey=460e6f530ef1588d40304db0a3596ab4`)

  //Render related artist on the page 

  return(

    <div>
      <h3>Related Artists</h3>
      {res.error === true && (
        <p>Something went wrong. Please try again later.</p>
      )}
      {res.loading === true && (
        <p>Loading...</p>
      )}
      {res.response && (
        <ul>
        {res.response.data.message.body.artist_list.map((artist, index) => (
          <li key={index}>{artist.artist.artist_name}</li>
        ))}
        </ul>
      )}
   </div>
  );
}

export default RelatedArtist;
