import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Player from  './components/Player/Player';
import Nav from './components/Nav/Nav';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
const drawerWidth = 240;

export default function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Nav/>
        <Box className='wrapper' component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Player" element={<Player />} />
            </Routes>
        </Box>
      </Box>
    </div>
  );
}
