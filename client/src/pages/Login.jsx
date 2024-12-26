

export default function Login() {
  return (
    <div className='login flex justify-center'>
        <div className="login-container lg:w-1/4 md:w-1/2 sm:w-1/2 p-10">
            <h1>Login</h1>
            <div className="login-email flex flex-col mt-4">
                <label className="login-label">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="login-input"
                />
            </div>
            <div className="login-password flex flex-col mt-4">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />
            </div>
            <button className="login-button py-1 px-5 mt-6 w-full">Login</button>
        </div>
    </div>
  )
}
