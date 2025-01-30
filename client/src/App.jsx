import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './hooks/useAuthContext'
import CreateExpense from './pages/CreateExpense'
import CreateIncome from './pages/CreateIncome'
import AllIncome from './pages/AllIncome'
import AllExpenses from './pages/AllExpenses'

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
          <Route
            path='/createExpense'
            element={ user ? <CreateExpense/> : <Navigate to={'/login'} />}
          />
          <Route
            path='/createIncome'
            element={ user ? <CreateIncome/> : <Navigate to={'/login'} />}
          />
          <Route
            path='/allIncome'
            element={ user ? <AllIncome/> : <Navigate to={'/login'} />}
          />
          <Route
            path='/allExpenses'
            element={ user ? <AllExpenses/> : <Navigate to={'/login'} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
