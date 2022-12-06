import React from 'react';
import Read from './pages/test.js';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  SearchBox,
  PoweredBy,
  Hits,
  Highlight,
} from 'react-instantsearch-hooks-web';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';


//algolia credentials
const searchClient = algoliasearch(
  process.env.REACT_APP_ALOGLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

function Hit ({ hit }) {
  let navigate = useNavigate();
  const url = "https://steamcdn-a.akamaihd.net/steam/apps/" + hit.appID + "/header.jpg"
  return (
    <div>
        <button onClick={() => navigate('/'+ hit.appID)}>
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
      <Router>
        <InstantSearch searchClient={searchClient} indexName='game_NAME' indexID='name'>
          <Configure hitsPerPage={6} />
          <h3 className='title'>What Do I Play Steam</h3>

          <SearchBox autoFocus placeholder='Search...' className='searchbox'/>

          <PoweredBy className='poweredby'/>

          <Hits hitComponent={Hit} className="hits"/>
        </InstantSearch>
      </Router>
      </div>
  );
}

export default App;