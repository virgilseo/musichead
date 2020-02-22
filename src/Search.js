import React from 'react';


function Search(props) {

  return(
    <div className='search container'>
     <div className='input-wrapper'>
       <input
         type='text'
         placeholder='Search for artist'
         className='search-input'
         onChange={(event) => {props.updateQuery(event.target.value)}}
       />
       <button className='search-btn' onClick={props.queryDatabase}>Search</button>
     </div>
    </div>
  )
}

export default Search
