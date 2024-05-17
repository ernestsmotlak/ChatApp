import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className='w-50' style={{ margin: '0 auto' }}>
            <h2 className='mt-5'>LandingPage</h2>
            <div class="card text-center">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className='btn btn-secondary'>Login</button>
                    
                    <button className='btn btn-info'>Sign Up</button>
                </div>
                <div class="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
        </div>
    )
}

export default LandingPage