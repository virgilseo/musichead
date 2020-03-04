import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

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
      <section>
        <h3>Bio</h3>
        <p>{data.profile}</p>
      </section>
      <section>
        <h3>Band members</h3>
        {data.realname && (
          <p>{data.realname}</p>
        )}
        {data.members && (
          <ul>
            {data.members.map((member, index) => (
              <li key={index}>{member.name}</li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>On the web</h3>
        {data.urls !== undefined && (
          <ul>
            {data.urls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel='noopener noreferrer'>{url}</a>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
       <h3>Discography</h3>
         <ul>
           {releases.map((release, index) => (
             <li key={index}>
               <p>{release.artist}</p>
               <p>{release.title}</p>
               <p>{release.year}</p>
             </li>
           ))}
         </ul>
       <p></p>
      </section>
    </div>
  );
}

export default ArtistPage;
