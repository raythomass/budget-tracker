import React from 'react'

export default function Signup() {
  return (
    <div className='signup flex justify-center'>
        <div className="signup-container lg:w-1/4 md:w-1/2 sm:w-1/2 p-10">
            <h1>Signup</h1>
            <div className="signup-name flex flex-col mt-4">
                <label className="signup-label">Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    className="signup-input"
                />
            </div>
            <div className="signup-email flex flex-col mt-4">
                <label className="signup-label">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="signup-input"
                />
            </div>
            <div className="signup-password flex flex-col mt-4">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                />
            </div>
            <button className="signup-button py-1 px-5 mt-6 w-full">Signup</button>
        </div>
    </div>
  )
}
