import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <div>
            <div className='w-50' style={{ margin: '0 auto' }}>
                <h2 className='mt-5 text-outline'>Chat app made with Socket.io</h2>
                <div class="card text-center mt-4 background">
                    <div class="card-header" style={{ height: '40px' }}>

                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Login / Sign Up</h5>
                        <p class="card-text">Login or Sign Up if you do not have an account.</p>
                        <button className='btn btn-secondary' onClick={goToLogin}>Login</button>
                        &nbsp;
                        &nbsp;
                        <button className='btn btn-dark' onClick={goToRegister}>Sign Up</button>
                    </div>
                    <div class="card-footer text-body-secondary" style={{ height: '40px' }}>
                    </div>
                </div>
                <div className="text-center p-3 fixed-bottom"
                    // style={{ backgroundColor: '#e5e5e5' }}
                    style={{ backgroundColor: '#e5e5e5', borderColor: '#cdcccd', borderWidth: '1px', borderStyle: 'solid', borderRadius: '5px' }}>
                    Code available at:
                    &nbsp;
                    <a className="text-dark" href="https://github.com/ernestsmotlak/WarCardGame">
                        {/* <i className="bi bi-github" style={{ width: '20px', height: '20px' }}></i> */}
                        <svg style={{ width: '20px', height: 'auto', marginBottom: '3px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>

                    </a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage