import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [shader, setShader] = useState('default');

  useEffect(() => {
    document.body.className = `${theme} ${shader}`;
  }, [theme, shader]);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings setTheme={setTheme} setShader={setShader} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
