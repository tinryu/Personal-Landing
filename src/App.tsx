import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Loading from './components/Loading/Loading';

function App() {
  const obj = { isLoading: true };
  const [state, setLoadding] = useState(obj);
  
  useEffect(() => {
    const closeLoading = () => {
      setLoadding({isLoading: false});
    }
    const timerID = setInterval(() => {
      closeLoading();
    }, 3000); 
    return () => clearInterval(timerID);    
  })
  
  return (
    <div className="App">
      <Nav/>
      <Loading isLoad={state.isLoading}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
