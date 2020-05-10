import React from 'react';
import useFetch from './useFetch.js'


function Events(props) {


  //Fetch events data from ticket master api

  const res = useFetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=hkbdfMkgTS9PiqJdNMKdj5bg7aKGR4Wk&attractionId=${props.eventsArtistId}`)

 //Render events on the page
 
  return(
    <div>
      <h3>Events</h3>
      {res.loading === true && (
        <p>Loading...</p>
      )}
      {res.error === true && (
        <p>Something went wrong. Please try again later.</p>
      )}
      {res.response && res.response.data.page.totalPages !== 0  && (
        <ul>
        {res.response.data._embedded.events.map(event => (
          <li key={event.id}>
            {event.name && (
              <p>{event.name}</p>
            )}
            {event._embedded.venues[0].name && (
              <p>{event._embedded.venues[0].name}</p>
            )}
            {event._embedded.venues[0].address && (
              <p>{event._embedded.venues[0].address.line1}</p>
            )}
            {event._embedded.venues[0].city && (
              <p>{event._embedded.venues[0].city.name} </p>
            )}
            {event._embedded.venues[0].state && (
              <p>{event._embedded.venues[0].state.name}</p>
            )}
            {event.dates.start.localDate && (
              <p>{event.dates.start.localDate}</p>
            )}
            {event.url && (
              <a href={event.url}>Get tickets</a>
            )}
          </li>
        ))}
        </ul>
      )}
    </div>
  )
}

export default Events;
