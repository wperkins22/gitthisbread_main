import React, { Component }  from "react";
import API from "../utils/API";

export default class Signout extends Component {
  
  constructor(props){
    super(props);

    this.state ={
    };
  }

  async componentDidMount(){
    await API.get("/signout");
    this.props.history.replace('/Home');
    window.location.reload();
  }

  render(){
    return (
          <div>
            <p>Signing out...</p>  
          </div>
      );
  }
}