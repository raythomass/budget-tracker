import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password)
}

  return (
    <form className='signup flex justify-center' onSubmit={handleSubmit}>
        <div className="signup-container lg:w-1/4 md:w-1/2 sm:w-1/2 p-10">
            <h1>Signup</h1>
            <div className="signup-name flex flex-col mt-4">
                <label className="signup-label">Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    className="signup-input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="signup-email flex flex-col mt-4">
                <label className="signup-label">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="signup-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="signup-password flex flex-col mt-4">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <button disabled={isLoading} className="signup-button py-1 px-5 mt-6 w-full">Signup</button>
            {error ?? <div className='error'>{error}</div>}
        </div>
    </form>
  )
}
