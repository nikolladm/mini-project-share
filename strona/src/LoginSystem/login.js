import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserManager} from "./userManager";

export function Login(props) {
    const { users, initialState } = UserManager();
    const userInfoRef = useRef(initialState);
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    function onButtonClick() {
        setEmailError("")
        setPasswordError("")

        const userInfo = userInfoRef.current;

        if ("" === userInfo.email) {
            setEmailError("Please enter your email")
            return
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
            setEmailError("Please enter a valid email")
            return
        }
        if ("" === userInfo.password) {
            setPasswordError("Please enter a password")
            return
        }
        if (userInfo.password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        const user = users.find((user) => user.email === userInfo.email && user.password === userInfo.password);

        if (user) {
            props.setLoggedIn(true);
            props.setUserInfo(user);
            navigate("/");
        } else {
            props.setLoggedIn(false);
            setPasswordError("Incorrect email or password");
        }
    }

    return (
        <div className="centeredDiv text14">
            <div>
                <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
                <div className="titleContainer">Login</div>

                <label htmlFor="email">Email</label><br/>
                <input id="email" type={"email"} autoComplete="email"
                       placeholder="Enter your email here"
                       onChange={ev => userInfoRef.current.email = ev.target.value }
                       onKeyDown={(event) => {if (event.key === "Enter") onButtonClick()}}
                />
                <br/><span className="errorLabel">{emailError}</span><br/>

                <label htmlFor="password">Password</label><br/>
                <input id="password" type={"password"} autoComplete="current-password"
                    placeholder="Enter your password here"
                    onChange={ev => userInfoRef.current.password = ev.target.value }
                    onKeyDown={(event) => {if (event.key === "Enter") onButtonClick()}}
                />
                <br/><span className="errorLabel">{passwordError}</span><br/><br/>

                <div className="textAlignedCenter">
                    <button className="greenButton" onClick={onButtonClick}>Log in</button>
                </div>

                <br/><br/><span>Don't have an account? <span className="hyperlink hyperlinkBlue" onClick={() => navigate("/register")}>Sign up</span> </span>
            </div>
        </div>

    );
}