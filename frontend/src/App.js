import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import LoginButton from "./Login";
import LogoutButton from "./Logout";

// create tiles for each workshops, with a register for workshop button
// OAuth

import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // useEffect(async () => {

  //   const workshops = await axios.get("https://workshop-signup.herokuapp.com/workshops")
  //   console.log(workshops)

  //   const id = 1; // change depending on what the user clicks
  //   const name = "Jonathan" // user input
  //   const request = await axios.post(`https://workshop-signup.herokuapp.com/workshop/${id}/register`, { "name": name })

  // }, [])

  return (
    <div className="App">
      {
        !isAuthenticated && (<LoginButton />)
      }
      {
        isAuthenticated && (<LogoutButton />)
      }

      {
        isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )

      }
    </div>
  );
}

export default App;
