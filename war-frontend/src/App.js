import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Login_SignUp/Register';
import Login from './Login_SignUp/Login';

function App() {
  return (
    <Router>
      <div className="App">
        App here.
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
