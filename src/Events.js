import React from 'react';


function Events(props) {

  //Deconstruct props

  const {events} = props;

  return(
    <div>
      <h3>Events</h3>
      <ul>
      {events.map(event => (
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
    </div>
  )
}

export default Events;
