import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleSubmit = async () => {
        logout()
    }
  return (
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
