import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Main Context 
import {ContextProvider} from './Context/Context'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);

// We have to wrap our entire app in our Context API provider so we can pass the children down from the "parent" Context store.

