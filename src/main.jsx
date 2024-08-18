import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, Router, Switch } from 'react-router-dom/cjs/react-router-dom.min.js'
import Login from './Components/Signin-Login/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
