import React, { useState } from "react";
//import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Register.css";
import API from "./utils/API";

export default function Register(props){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDOB] = useState("");
    const [failMesg, setMesg]     = useState("");
    function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
    function validateForm() {
        if(userName.length <= 0 || userName.length > 15 || password.length <= 4 || password.length > 30 || Object.prototype.toString.call(new Date(dateOfBirth)) !== "[object Date]" || confirmPassword !== password){
            return false;
        }
	if(!validateEmail(email)){
	    return false;
	}
        if(/[;:'"(){}]/.test(userName) || /[;:'"(){}]/.test(password)){
            return false;
        }
    
    return true;
    }

    function handleSubmit(event) {
        //Tells user agent if event is not explicity handled, default action shouldn't be taken as normally.
        event.preventDefault();

        const userInfo = {
            userName: userName,
            password: password,
	    email: email,
	    confirmPassword: confirmPassword,
	    dateOfBirth: dateOfBirth,
        };
        API.post('/register', {userInfo})
            .then(res => {
                setMesg(res.data.Mesg);
                if(res.data.Mesg === "success"){
                    props.history.replace('/Home'); 
                }
            })
    }
    return(
	<body>
	<div className ="Register">
	    <form onSubmit={handleSubmit}> 
                    <div id="login-box">
			<h1> Sign up </h1>
			    <input type="text" onChange={e => setUserName(e.target.value)} name="username" placeholder="Username"/>
			    <input type="text" onChange={e => setEmail(e.target.value)} name="email" placeholder="Email"/>
			    <input type="text" onChange={e => setDOB(e.target.value)} name="DOB" placeholder="Date of Birth"/>
			    <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Password"/>
			    <input type="password" onChange={e => setConfirmPassword(e.target.value)} name="password2" placeholder="Confirm Password"/>
			    <input type="submit" disabled={!validateForm()} name="signup" value="Sign Up"/>
		    </div>
	  </form>
        </div>
	</body>
    );


}
