import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // skipping StrictMode to better observe NotFirstRender behavior
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
