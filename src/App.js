import React, {useState} from 'react';
import './App.css';
import Header from './Header.js';
import Search from './Search';
import Footer from './Footer.js';

function App() {

  //Set initial state of the query

  const [query, setQuery] = useState('');

  //Update query on user input

  function updateQuery(userQuery)  {
    setQuery(userQuery);
  }

  console.log(query);

  return (
    <div className="App">
      <Header />
      <Search updateQuery = {updateQuery} />
      <Footer />
    </div>
  );
}

export default App;
