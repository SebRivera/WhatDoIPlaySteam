import React from 'react';
import "./App.css"
import Home from './pages/home.js';
import Game from './pages/game.js';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:appid" element={<Game />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;