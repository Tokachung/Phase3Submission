import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// button 
import axios from "axios"
import { useState, useEffect } from "react"
import { useAuth0, User } from "@auth0/auth0-react";


export default function BasicCard({ workshop }) {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [workshops, setWorkshops] = useState([])
  async function getWorkshopData() {
    const workshops = await axios.get("https://workshop-signup.herokuapp.com/workshops")
    console.log(workshops.data);
    setWorkshops(workshops.data)
  }

  const [isBrowserWindow, setIsBrowserWindow] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setIsBrowserWindow(e.matches));
  }, []);

  //   console.log(workshop)
  return (
    <Card variant="outlined" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} sx={{
      width: {
        xs: 200,
        sm: 250,
        md: 350,
        lg: 400,
        xl: 500
      },
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {workshop.date}
        </Typography>
        <Typography variant="h6" component="div" marginBottom="10px">
          Location: {workshop.name}
          <br />
        </Typography>
        {
          isBrowserWindow && <div>
            <Typography sx={{ mb: 1 }}>
              Volunteers Attending:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {workshop.volunteers.map((volunteer) => {
                return (
                  <div>{volunteer}</div>
                )
              })
              }
            </Typography>
          </div>
        }
      </CardContent>
      <CardActions style={{ alignSelf: "flex-end" }}>


        <Button size="medium" onClick={() => {
          axios.post(`https://workshop-signup.herokuapp.com/workshop/${workshop.id}/register`, { "name": user.name })
          alert(`You have registered for ${workshop.name} workshop`)
          getWorkshopData();
        }}>Register</Button>


      </CardActions>
    </Card>
  );
}
