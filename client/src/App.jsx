import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Toaster position='top-center' toastOptions={{duration: 2000}}/>
        <Routes>
          <Route
            path='/'
            element={ user ? <Home/> : <Navigate to={'/login'} />}
          />
          <Route
            path='/login'
            element={ !user ? <Login/> : <Navigate to={'/'} />}
          />
          <Route
            path='/signup'
            element={ !user ? <Signup/> : <Navigate to={'/'} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
