import React, { useState, useEffect, useCallback } from "react"
import './App.css';
import axios from "axios"
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import BasicCard from './BasicCard'
import { Button, AppBar, Grid, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (

    <div className="App">
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }} />

      <AppBar position="relative">
        <Toolbar>
          <PrecisionManufacturingIcon />
          <Typography variant="h6">
            Robogals Workshop Signup
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <div>
          <container maxWidth="sm">
          </container>
        </div>
      </main>
      {
        !isAuthenticated && (<LoginButton />)
      }
      {
        isAuthenticated && (<LogoutButton />)
      }

      {
        isAuthenticated && (
          <div>
            <h2>Your Signup Details</h2>
            <p>Name: {user.name}</p>
            <p>Contact Email: {user.email}</p>
            <img src={user.picture} alt={user.name} />
          </div>
        )

      }
      {
        isAuthenticated && (
          <h2>Available Workshops</h2>
        )
      }

      <Grid container style={{
        justifyContent: "center"
      }}>
        {
          isAuthenticated &&
          workshops.map((workshop) => {
            return (
              <BasicCard workshop={workshop}></BasicCard>
            )
          })
        }
      </Grid>

      <Button onClick={() => {
        axios.get("https://workshop-signup.herokuapp.com/workshops/reset")
        getWorkshopData();
      }}>Reset</Button>
    </div>
  );
}

export default App;
