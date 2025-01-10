import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import toast from 'react-hot-toast'

export default function Signup() {
    //Set states for all input values for signup
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //Grab signup, isLoading, and error from the useSignup.jsx context
  const { signup, isLoading, error } = useSignup()

  //handleSubmit will trigger when form is submiotted below
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault()
    //Use signup function similar to mongoose statics and input the cerated states
    await signup(name, email, password)
    
}

  return (
    //Create a signup form and have the handleSubmit function trifgger when the form is sbumitted 
    //Inputs for information must hvae onChange and value
    //Input onChange takes and event (e) and sets the state based on the e.target.value
    //Value of each input will be the state ie. name input has a value of name which corresponds the state created
    //The onChange is repsonsible for changing the value
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
