import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//https://auth0.com/docs/quickstart/spa/react/interactive

import { Auth0Provider } from "@auth0/auth0-react";
// Auth0Provider stores the authentication state of your users
// and the state of the SDK — whether Auth0 is ready to use or not.
// It also exposes helper methods to log in and log out your users,
// which you can access using the useAuth0() hook.



// injecting App.js into index.js
const root = ReactDOM.createRoot(document.getElementById('root'));

// setting up 0Auth
root.render(
  <Auth0Provider
  domain="dev-v9zaiss3.us.auth0.com"
  clientId="1U8VFcTh0mQfWbyFo2rxfAHy6CxSKBpB"
  redirectUri={window.location.origin}
>
  <App /> 
</Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
