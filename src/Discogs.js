import React from 'react';


function Discogs(props) {

  // Desconstruct props

  const {data} = props;

  // Display artist information(biography and web links)
  // on the page uisng information from the discogs api

  return(
    <div className='discogs-container'>
      {data.profile && (
        <section>
          <h3>Bio</h3>
          <p>{data.profile.replace(/a=|[[]|m=|l=|/g, '').replace(/[[b]]|[/]|]/g, '')}</p>
        </section>
      )}
      {data.realname && (
        <section>
          <h3>Real name</h3>
          <p>{data.realname}</p>
        </section>
      )}
      {data.members && (
        <section>
          <h3>Band members</h3>
          {data.members && (
            <ul>
              {data.members.map((member, index) => (
                <li key={index}>{member.name}</li>
              ))}
            </ul>
          )}
        </section>
      )}
      {data.urls && (
        <section>
          <h3>On the web</h3>
            <ul>
              {data.urls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel='noopener noreferrer'>{url}</a>
                </li>
              ))}
            </ul>
        </section>
      )}
   </div>
  )
}

export default Discogs
