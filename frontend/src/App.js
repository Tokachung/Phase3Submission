import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import LoginButton from "./Login";
import LogoutButton from "./Logout";

// styling
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';

import BasicCard from './BasicCard'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


// create tiles for each workshops, with a register for workshop button
// OAuth

import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const [workshops, setWorkshops] = useState([])

  // obtaining workshop data
  const { user, isAuthenticated, isLoading } = useAuth0();
  async function getWorkshopData() {
    const workshops = await axios.get("https://workshop-signup.herokuapp.com/workshops")
    console.log(workshops.data);
    setWorkshops(workshops.data)
  }

  useEffect(async () => {
    await getWorkshopData()
  }, [])


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
      <Grid container spacing={2}>
      { isAuthenticated && 
        workshops.map((workshop) => {
          return (
            
            // <div>
            
            //   <div>ID: {workshop.id}</div>
            //   <div>{workshop.name}</div>
      
            //   {
            //     workshop.volunteers.map((volunteer) => {
            //       return (
            //         <div>{volunteer}</div>
            //       )
            //     })
            //   }
            //   <button onClick={() => {
            //     axios.post(`https://workshop-signup.herokuapp.com/workshop/${workshop.id}/register`, { "name": user.name })
            //     alert(`You have registered for ${workshop.name} workshop`)
            //     getWorkshopData();
            //   }}>Register</button>
            // </div>
            <Grid item xs={8}>
            <BasicCard workshop={workshop}></BasicCard>
            </Grid>
          )
        }) 
    
      } </Grid>
    

      <button onClick={() => {
        axios.get("https://workshop-signup.herokuapp.com/workshops/reset")
        getWorkshopData();
        }}>Reset</button>
    </div>
  );
}

export default App;
