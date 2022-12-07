import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  SearchBox,
  PoweredBy,
  Hits,
  Highlight
} from 'react-instantsearch-hooks-web';
import "./home.css"
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid'


//algolia credentials
const searchClient = algoliasearch(
  process.env.REACT_APP_ALOGLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

function Hit ({ hit }) {
  let navigate = useNavigate();
  const url = "https://steamcdn-a.akamaihd.net/steam/apps/" + hit.appID + "/header.jpg"
  return (
    <div style = {{opacity: .9, backgroundImage: `url(${url})`,  borderRadius: 25}}>
      <div style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', borderRadius: 25, boxShadow: '1px 2px 15px #66c0f4'}}>
      <button className="click" onClick={() => navigate('/'+ hit.appID)} >
        <h1 className='center'> <Highlight attribute="name" hit={hit} /> </h1>
        <p className='center'>
          <strong>Developer:</strong> {hit.developer}
        </p>
        <p className='center'>
          <strong>Price:</strong>  {hit.price}
        </p>
      </button>
      </div>
    </div>
  );
}


const Home = () => {
  return (
    <div>
        <InstantSearch searchClient={searchClient} indexName='game_NAME' indexID='name'>
            <Configure hitsPerPage={6} />
            <h3 className='title'>What Do I Play Steam</h3>

            <SearchBox autoFocus placeholder='Search...' className='searchbox'/>

            <PoweredBy className='poweredby'/>
            <Hits hitComponent={Hit} className="hits"/>
        </InstantSearch>
      </div>
  );
}

export default Home;