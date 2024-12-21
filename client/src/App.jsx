import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  )
}

export default App
