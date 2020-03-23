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
     {props.hits !== undefined && props.hits.id && props.error === false && props.hits !== [] && (
       <div className='search-results'>
         <p>We found 1 search result</p>
         <p>{props.hits.title}</p>
         <img src={props.hits.cover_image} alt={props.hits.title} />
         <Link to='/results'>
           <button>Expand</button>
         </Link>
       </div>
     )}
     {props.hits === undefined && props.error === false && (
       <div>
        <p>Sorry, we found no results :(</p>
       </div>
     )}
     {props.error === true && (
       <div>
         <p>Something went wrong. Please try again later.</p>
       </div>
     )}
    </div>
  )
 }

export default Search
