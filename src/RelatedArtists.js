import React from 'react';

function RelatedArtist(props) {

  return(

    <div>
      <h3>Related Artists</h3>
      {props.relatedArtist && (
        <ul>
        {props.relatedArtist.map((artist, index) => (
          <li key={index}>{artist.artist.artist_name}</li>
        ))}
        </ul>
      )}
   </div>
  );
}

export default RelatedArtist;