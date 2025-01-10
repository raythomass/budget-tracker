import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

export default function Login() {
    //Create states for email and password
    //This willbe set based on what the user puts into the inut variables below
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //Grab login, islaoding, and error from the useLogin.jsx context
    const { login, isLoading, error } = useLogin()

    //handleSubmit will be triggered when submit the below form
    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault()
        //use login function from useLogin.jsx and feed it the email and password states
        await login(email, password)
    }
    


  return (
    //Create a login form and have the handleSubmit trigger when the form is submitted
    //Inputs for information must hvae onChange and value
    //Input onChange takes and event (e) and sets the state based on the e.target.value
    //Value of each input will be the state ie. email input has a value of email which corresponds the state created
    //The onChange is repsonsible for changing the value
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
