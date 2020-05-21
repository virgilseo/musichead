import React from 'react';
import {Link} from 'react-router-dom';


function Search(props) {

  return(
    <div className='search-container'>
     <div className='input-wrapper'>
       <input
         type='text'
         placeholder='Search for artist'
         className='search-input'
         onChange={(event) => {props.updateQuery(event.target.value)}}
       />
       <button className='search-btn' onClick={props.query !== '' ? props.queryDatabase : undefined }>Search</button>
     </div>
     {props.discogsLoader && props.relatedLoader && props.eventsLoader ? (
       <div>
         <p>Loading...</p>
       </div>
     ) : (
       <section>
       {props.discogsData !== undefined && props.discogsData.id && props.discogsError === false &&  (
         <div className='search-results'>
           <p>We found 1 search result</p>
           <p>{props.discogsData.title}</p>
           <img src={props.discogsData.cover_image} alt={props.discogsData.title} />
           <Link to='/results'>
             <button>Expand</button>
           </Link>
         </div>
       )}
       </section>
     )}
     {props.discogsData === undefined && props.discogsError === false &&
       !props.discogsLoader && !props.relatedLoader && !props.eventsLoader && (
       <div>
        <p>Sorry, we found no results :(</p>
       </div>
     )}
     {props.discogsError === true && (
       <div>
         <p>We are having trouble comunicating with the discogs api.</p>
       </div>
     )}
     {props.relatedArtistError === true && (
       <div>
         <p>We are having trouble comunicating with the musixmatch api.</p>
       </div>
     )}
     {props.eventsError === true &&  (
       <div>
         <p>We are having trouble comunicating with the ticket master api.</p>
       </div>
     )}
    </div>
  )
 }

export default Search
