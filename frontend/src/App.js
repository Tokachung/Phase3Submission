import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"




function App() {

  useEffect(async () => {

    const workshops = await axios.get("http://localhost:3001/workshops")
    console.log(workshops)

  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
