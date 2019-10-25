import React, { Component } from 'react';
import fork from '../fork.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={fork} className="App-logo" alt="logo" />
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">Book</a>
          <a href="#">Nothing</a>
          <a href="#">Logout</a>
        </nav>
      </header>
    )
    }
}
