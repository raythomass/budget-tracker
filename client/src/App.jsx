import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={<Home/>}
          />
          <Route
            path='/login'
            element={<Login/>}
          />
          <Route
            path='/signup'
            element={<Signup/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
