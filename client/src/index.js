import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { Auth0Provider } from '@auth0/auth0-react';
import { CurrentUserProvider } from './Components/Pages/Profile/Profile';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
