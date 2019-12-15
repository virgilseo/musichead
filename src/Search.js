import React from 'react';


function Search() {

  return(
    <div className='search container'>
     <div className='input-wrapper'>
       <input type='text' placeholder='Search for artist' className='search-input'/>
       <button className='search-btn'>Search</button>
     </div>
    </div>
  )
}

export default Search
