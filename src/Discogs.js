import React from 'react';


function Discogs(props) {

  // Desconstruct props

  const {data, error, releases} = props

  // Display artist information(biography, web links and releases)
  // on the page uisng information from the discogs api

  return(
    <div className='discogs-container'>
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
      </section>
    </div>
  )
}

export default Discogs
