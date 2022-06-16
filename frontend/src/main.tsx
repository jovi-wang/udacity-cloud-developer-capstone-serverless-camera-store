import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CamerasProvider from './context/CamerasProvider';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-68hkuh2i.us.auth0.com'
    clientId='MvSvzKVRo4RwiZhcclVqM3TNM8HVSftY'
    redirectUri={window.location.origin}
  >
    <CamerasProvider>
      <App />
    </CamerasProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
