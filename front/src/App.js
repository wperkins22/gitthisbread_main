import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header className='Header'>
          </Header>
        <header className="App-header">
          </header>
      </div>
    </Router>
  );
}
export default App;