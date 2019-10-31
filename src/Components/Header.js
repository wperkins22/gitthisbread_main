import React, { Component } from 'react';
import fork from '../fork.svg';
import './Header.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "../Containers/Home";
import Login from "../Login";

export default class Header extends Component {
  render() {
    return (
      <HashRouter>
        <header className="Header">
          <img src={fork} className="App-logo" alt="logo" />
          <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="#">Placeholder1</NavLink>
            <NavLink to="#">Placeholder2</NavLink>
            <NavLink to="/Login">Login</NavLink>
          </nav>
        </header>
        <div className="Content">
          <Route exact path="/" component={Home}/>
          <Route path="/Login" component={Login}/>
        </div>
      </HashRouter>
    );
    }
}
