import React from 'react';
import "./App.css"
import Read from './test.js';
import history from './history';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  SearchBox,
  PoweredBy,
  Hits,
  Highlight,
} from 'react-instantsearch-hooks-web';
import {Routes, Route, useNavigate} from 'react-router-dom';


//algolia credentials
const searchClient = algoliasearch(
  process.env.REACT_APP_ALOGLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

function Hit ({ hit }) {
  const navigate = useNavigate();

  const navigateToTest = () => {
    // 👇️ navigate to /contacts
    navigate('/test');
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/');
  };
  const url = "https://steamcdn-a.akamaihd.net/steam/apps/" + hit.appID + "/header.jpg"
  return (
    <div>
      <button onClick={() => history.push('/Game')}>
        <img src= {url} alt={hit.name} />
        <h1> <Highlight attribute="name" hit={hit} /> </h1>
        <p><strong>Developer:</strong> {hit.developer}</p>
        <p><strong>Price:</strong>  {hit.price}</p>
      </button>
    </div>
  );
}


const App = () => {
  return (
    <div>
    <InstantSearch searchClient={searchClient} indexName='game_NAME'>
    <Configure hitsPerPage={6} />
      <h3 className='title'>Algolia Firebase Search</h3>

      <SearchBox autoFocus placeholder='Search...' className='searchbox'/>

      <PoweredBy className='poweredby'/>

      <Hits hitComponent={Hit} className="hits"/>

      </InstantSearch>
    </div>
  );
}

export default App;