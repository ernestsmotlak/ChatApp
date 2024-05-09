import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hello world!</h1>
        <Routes>
          <Route path='/register' />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
