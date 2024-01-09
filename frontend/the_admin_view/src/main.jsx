import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProviderAllOver from './context/index.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProviderAllOver>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProviderAllOver>  
)
