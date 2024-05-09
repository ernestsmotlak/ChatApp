import React from 'react'

const Register = () => {
    return (
        <div>
            <h2>Register here:</h2>
            <form className='container login-form'>
                Local
                <div className='row justify-content-center'>
                    <label className='form-label mt-2'>Username:</label>
                    <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row justify-content-center'>
                    <label className='form-label'>Password:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button
                    className='login-form-button mt-3 mb-3'
                    type="submit"
                >
                    Login
                </button>
                <br /><br /><br /><br />
            </form>
        </div>
    )
}

export default Register