import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [registrationSuccessful, setRegistrationSuccessful] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3010/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, passwordAgain }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setRegistrationSuccessful(errorData.registrationReturn);
                console.log('Prva ' + registrationSuccessful);
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setRegistrationSuccessful(data.registrationReturn);
            console.log('Druga ' + registrationSuccessful);

        }
        catch (error) {
            setError(error.message);
            setRegistrationSuccessful(error.registrationReturn);
            console.log('Treča ' + registrationSuccessful);
        }
    };

    return (
        <div>
            <h2>Register here:</h2>
            <form className='container login-form w-25 bg-primary-subtle' onSubmit={handleSubmit}>
                <div className='row justify-content-center'>
                    <label className='form-label mt-2'>Insert your username:</label>
                    <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row justify-content-center'>
                    <label className='form-label'>Insert you password:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='row justify-content-center mt-3'>
                    <label className='form-label'>Insert the password again:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                </div>
                <button
                    className='login-form-button mt-3 mb-3 btn btn-primary'
                    type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Register