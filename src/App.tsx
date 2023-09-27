import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './config/Router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
    <AppRouter />
    </div>
  );
}

export default App;
