import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Similar from './movie/Similar.js';
import Tvsim from './tv/Tvsim.js';

const Search = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [currentQuery, setCurrentQuery] = useState('');
  const [myurl, setMyUrl] = useState('');
  const [tvurl, settvUrl] = useState('');

  useEffect(() => {
    setCurrentQuery(searchQuery);

    const formattedQuery = searchQuery ? searchQuery.replace(/\s/g, '%20') : '';

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${formattedQuery}&api_key=972bf2f0b5a2dba4a5df2e4153bd68ec&page=1`;
    console.log(apiUrl);
    setMyUrl(apiUrl);
  }, [searchQuery]);


  useEffect(() => {
    setCurrentQuery(searchQuery);
    const formattedQuery = searchQuery ? searchQuery.replace(/\s/g, '%20') : '';
  const Url = `https://api.themoviedb.org/3/search/tv?query=${formattedQuery}&api_key=972bf2f0b5a2dba4a5df2e4153bd68ec&page=1`;
    console.log(Url);
    settvUrl(Url);
  }, [searchQuery]);

  return (

    <div>
      <div className = "container">
          <h2 style={{ color: '#0ba3d6' }}>Search Results for "{currentQuery}"- Movies</h2>
          <Similar url={myurl} resultsPerPage={4}/>
        </div>
     
      <div className = "container">
          <h2 style={{ color: '#0ba3d6' }}>Search Results for "{currentQuery}" - Tv shows</h2>
          <Tvsim url={tvurl} resultsPerPage={4}/>
      </div>
    </div>

  );
};

export default Search;
