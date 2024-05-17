import React, { useState } from 'react';
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

        // Client-side validation
        if (!username || !password || !passwordAgain) {
            setError('All fields are required.');
            return;
        }

        if (password !== passwordAgain) {
            setError('Passwords do not match.');
            return;
        }

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
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setRegistrationSuccessful(data.registrationReturn);
            console.log('Registration of the user: ' + username + ' was successfull!');
            navigate('/login');

        } catch (error) {
            setError(error.message);
            setRegistrationSuccessful(false);
        }
    };

    return (
        <div>
            <h2>Register here:</h2>
            <form className='container login-form w-25 bg-primary-subtle' onSubmit={handleSubmit}>
                {/* Username input */}
                <div className='row justify-content-center'>
                    <label className='form-label mt-2'>Insert your username:</label>
                    <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {/* Password input */}
                <div className='row justify-content-center'>
                    <label className='form-label'>Insert your password:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* Password again input */}
                <div className='row justify-content-center mt-3'>
                    <label className='form-label'>Insert the password again:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
                </div>
                {/* Submit button */}
                <button className='login-form-button mt-3 mb-3 btn btn-primary' type="submit">
                    Register
                </button>
            </form>
            {/* Display error message if any */}
            {error && <span className='text-danger fw-bold fs-3 mb-3'>{error}</span>}
            {/* Display success message if registration was successful */}
            {registrationSuccessful && <span className='text-success fw-bold fs-3 mb-3'>Registration successful!</span>}
        </div>
    )
}

export default Register;