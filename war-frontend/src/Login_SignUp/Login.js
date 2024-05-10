// import { json } from 'express';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccessful, setLoginccessful] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3010/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setLoginccessful(errorData.loginStatus);
                console.log('Prvi Login status: ' + loginSuccessful);
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setLoginccessful(data.loginStatus);
            console.log(username + ' login was successful!');


        }
        catch (error) {
            setError(error.message);
            setLoginccessful(error.loginStatus);
            console.log('Tretjic Login status: ' + loginSuccessful);
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <form className='container login-form w-25 bg-primary-subtle' onSubmit={handleSubmit}>
                <div className='row justify-content-center'>
                    <label className='form-label mt-2'>Insert your username:</label>
                    <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row justify-content-center'>
                    <label className='form-label'>Insert you password:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='btn btn-danger mt-3 mb-4' type='submit'>Login.</button>
            </form>
        </div>
    )
}

export default Login