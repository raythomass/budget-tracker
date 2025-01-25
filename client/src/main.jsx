import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ExpenseContextProvider } from './context/ExpenseContext.jsx'
// import { ExpenseContextProvider } from './context/ExpenseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
