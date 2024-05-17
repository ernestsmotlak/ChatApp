import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    
    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='w-50' style={{ margin: '0 auto' }}>
            <h2 className='mt-5'>Welcome to ...</h2>
            <div class="card text-center mt-4">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className='btn btn-secondary' onClick={goToLogin}>Login</button>
                    <button className='btn btn-info' onClick={goToRegister}>Sign Up</button>
                </div>
                <div class="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
        </div>
    )
}

export default LandingPage