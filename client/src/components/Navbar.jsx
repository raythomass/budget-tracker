import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar flex justify-between px-40 py-6">
        <Link to={'/'}>
            <h1 className="logo">Budget Tracker</h1>
        </Link>
        <div className="nav-links flex gap-6">
            <Link to={'/login'}>
                <h3 className='nav-link'>Login</h3>
            </Link>
            <Link to={'/signup'}>
                <h3 className='nav-link'>Signup</h3>
            </Link>
        </div>
    </div>
  )
}
