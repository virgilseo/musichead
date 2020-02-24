import React from 'react';
import {Link} from 'react-router-dom';

function ArtistPage() {

  return (
    <div>
      <Link to='/'>
        <i className='material-icons'>arrow_back</i>
      </Link>
      <section>
        <h3>Bio</h3>
        <p></p>
      </section>
      <section>
        <h3>Band members</h3>
        <p></p>
      </section>
      <section>
        <h3>On the web</h3>
        <p></p>
      </section>
      <section>
       <h3>Discography</h3>
       <p></p>
      </section>
    </div>
  );
}

export default ArtistPage;
