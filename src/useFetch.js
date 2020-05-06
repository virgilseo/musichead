import {useState, useEffect} from 'react';

const useFetch = (url, options) => {

//Set the initial state

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {

   const axios = require('axios')

   setLoading(true)
   setError(false)

//Fetch data from url with proper error handeling

   axios.get(url).then(response => setResponse(response))
   .catch(error => setError(true))
   .finally(() => setLoading(false))
 },[url])

 return {response, loading, error}
}

export default useFetch;
