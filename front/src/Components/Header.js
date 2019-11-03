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
import API from "../utils/API";
import axios from "axios";

export default class Header extends Component {
  constructor(props){
    super(props);

    this.state ={
      headers: null,
    };
  }

  async componentDidMount(){
    console.log("mounted");
    try{const response = await API.get("test")
      console.log(response);
      const headerData = response.data;
      console.log(headerData);
      this.setState({headers: headerData}); 
      console.log(this.state.headers);
    }catch (error){
      if (error.response) {
          /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
          /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
        console.log(error.request);
      } else {
          // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
    //const axiosInstance = axios.create();
    //const response = await axiosInstance.get("htpp:localhost:8082/");
    
  }

  render() {
    if(this.state.headers == null) return <p>loading...</p>;
    return (
      <HashRouter>
        <header className="Header">
          <img src={fork} className="App-logo" alt="logo" />
          <nav className="navbar">
            
              <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="#">{this.state.headers.head1}</NavLink>
                <NavLink to="#">{this.state.headers.head2}</NavLink>
                <NavLink to="/Login">Login</NavLink>
              </div>
               
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
