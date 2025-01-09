import { useEffect, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {toast} from 'react-hot-toast'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    


  return (
    <form className='login flex justify-center' onSubmit={handleSubmit}>
        <div className="login-container lg:w-1/4 md:w-1/2 sm:w-1/2 p-10">
            <h1>Login</h1>
            <div className="login-email flex flex-col mt-4">
                <label className="login-label">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="login-password flex flex-col mt-4">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <button className="login-button py-1 px-5 mt-6 w-full" disabled={isLoading}>Login</button>
            {/* {error ?? <div className='error'>{error}</div>} */}
        </div>
    </form>
  )
}
