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
          <p>Name:{event.name}</p>
          <p>Venue:{event._embedded.venues[0].name}</p>
          <p>Address: {event._embedded.venues[0].address.line1}</p>
          <p>City: {event._embedded.venues[0].city.name} </p>
          {event._embedded.venues[0].state && (
            <p>State: {event._embedded.venues[0].state.name}</p>
          )}
          <p>Date: {event.dates.start.localDate}</p>
          <a href={event.url}>Get tickets</a>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Events;
