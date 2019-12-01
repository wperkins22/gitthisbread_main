import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        //Make this more fleshed out later, for now just minimum requirements
        if(userName.length <= 0 || userName.length > 15 || password.length <= 4 || password.length > 30){
            return false;
        }
        if(/[;:'"]/.test(userName)){
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        //Tells user agent if event is not explicity handled, default action shouldn't be taken as normally.
        event.preventDefault();
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" size="lg">
                    <FormLabel>Username </FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    </FormGroup>
                <FormGroup controlId="password" size="lg">
                    <FormLabel>Password </FormLabel>
                    <FormControl
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button block size="lg" disabled={!validateForm()} type="submit">
                    Login!
                </Button>
            </form>
        </div>
    );
}