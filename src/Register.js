import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Register.css";
import API from "./utils/API";

export default function Register(props){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDOB] = useState("");
    const [firstName, setFN] = useState("");
    const [lastName, setLN] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [failMsg, setMsg]     = useState("");
    function validateNumber(number) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (number.match(phoneno))
	{
	    return true;
	}
	return false;
    }
	

    function handleSubmit(event) {
        //Tells user agent if event is not explicity handled, default action shouldn't be taken as normally.
        event.preventDefault();

        const userInfo = {
            password: password,
	    email: email,
	    confirmPassword: confirmPassword,
	    dateOfBirth: dateOfBirth,
	    firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber
        };
        API.post('/Register', {userInfo})
            .then(res => {
                setMsg(res.data.Msg);
                if(res.data.Msg === "Success"){
                    props.history.replace('/Home'); 
                }
            })
    }
    return(
	<body>
	<div className ="Register">
	    <form onSubmit={handleSubmit}> 
                    <div id="login-box">
			<h1> Sign Up Form</h1>
			    <input type="text" onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" id="A"/>
			    <input type="text" onChange={e => setFN(e.target.value)} name="firstname" placeholder="First name" id="A"/>
			    <input type="text" onChange={e => setLN(e.target.value)} name="lastname" placeholder="Last Name" id="A"/>
			    <input type="text" onChange={e => setPhoneNumber(e.target.value)} name="phonenumber" placeholder="Phone Number" id="A"/>
			    <input type="text" onChange={e => setDOB(e.target.value)} name="DOB" placeholder="Date of Birth" id="A"/>
			    <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Password" id="A"/>
			    <input type="password" onChange={e => setConfirmPassword(e.target.value)} name="password2" placeholder="Confirm Password" id="A"/>
			    <input type="submit" /*disabled={!validateForm()}*/ name="signup" value="Sign Up" id="B"/>
		    </div>
	  </form>
	<p className="Msg">{failMsg}</p>
        </div>
	</body>
    );


}
