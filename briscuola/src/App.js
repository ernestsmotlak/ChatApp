import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Login_SignUp/Register';
import Login from './Login_SignUp/Login';
import NotFound from './Components/NotFound';
import LandingPage from './Components/LandingPage';
import { useState } from 'react';
import { useEffect } from 'react';
import User from './Components/User';

function App() {
  const [uuid, setUuid] = useState(null);
  const [btnInLoginClicked, setBtnInLoginClicked] = useState(null);

  useEffect(() => {
    console.log('App.js uuid: ' + uuid);
    console.log('Btn clicked: ' + btnInLoginClicked);
  }, [uuid, btnInLoginClicked]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setUuid={setUuid} setBtnInLoginClicked={setBtnInLoginClicked} />} />
          {uuid && btnInLoginClicked && (
            <Route path={`/username/${uuid}`} element={<User />} />
          )}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
