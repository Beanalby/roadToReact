import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  {/* Not using StrictMode while playing with performance/re-rendering */}
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode>, */}
  </>
)
