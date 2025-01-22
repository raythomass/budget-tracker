import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
    //Grab user from authContext to use for changing navbar based on user status
    const { user } = useAuthContext()
    //Grab logout to be used in navbar when a user is active
    const { logout } = useLogout()
    //Create a funcation that logout out the user when submitted
    const handleSubmit = async () => {
        logout()
    }

  return (
    //Test user status and change the navbar based on if there is a user active
    //If there is a user logged in, the navbar will only show an h3 that says logout
    //If there is now user, the navbar will show a link to the login and sign up pages
    <div className="navbar flex justify-between px-40 py-6">
        <Link to={'/'}>
            <h3 className="logo">Budget Tracker</h3>
        </Link>
            {user && (
                <button onClick={handleSubmit}>Logout</button>
            )}
            {!user && (
                <div className='nav-links flex gap-6'>
                    <Link to={'/login'}>
                <h3 className='nav-link'>Login</h3>
            </Link>
            <Link to={'/signup'}>
                <h3 className='nav-link'>Signup</h3>
            </Link>
                </div>
            )}
        </div>
  )
}
