import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function ArtistPage(props) {

  //Set initial state

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  //Fetch artist information form the discogs api

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

  console.log(data);
  console.log(error);
  console.log(props.hits.id)

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
