import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import {UserManager} from "./LoginSystem/userManager";
import {ApartmentManager} from "./apartmentSystem/apartmentManager";
import {PopupRemovingAccount as Popup} from "./components/popup";

export function Home(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {users, removeUser} = UserManager();
    const {apartments} = ApartmentManager();

    const [showPopup, setShowPopup] = useState(false);

    function loginButton() {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    const openPopup = () => { if (userInfo.id !== 0) { setShowPopup(true); } };
    const closePopup = () => { setShowPopup(false); };
    const confirmDelete = () => {
        removeUser(userInfo.id)
        localStorage.removeItem("user")
        props.setLoggedIn(false)
        closePopup();
    };

    return (
        <div className="centeredDiv">
            <button onClick={() => console.log(apartments)}>Console print apartments</button>
            <button onClick={() => console.log(users)}>Console print users</button>

            <div className="text14 textAlignedCenter">
                <div className="titleContainer">
                    <div>Welcome!</div>
                </div>

                <div>This is the home page.</div>
                <br/><br/><br/>
                <div className="TextAlignedCenter">
                    <button className='inputButton greenButton' onClick={loginButton}>{loggedIn ? "Log out" : "Log in"}</button>
                    {(!loggedIn ? <button className='inputButton whiteButton' onClick={() => navigate("/register")}>Sign up</button> : <div/> )}
                </div>
            </div>
            {(loggedIn ?
                <>
                    <div>
                        <br/> ID: {userInfo.id}
                        <br/> Firstname: {userInfo.firstname} {userInfo.lastname}
                        <br/> Email: {userInfo.email}
                        <br/> Password: {userInfo.password}
                        <br/><br/>
                    </div>
                    <button className="redButton" onClick={openPopup}>Remove account</button>
                    <Popup show={showPopup} onClose={closePopup} onConfirm={confirmDelete}/>
                    <button className="greenButton longerButton" onClick={() => navigate("/apartments")}>Show my apartments</button>
                    <button className="greenButton longerButton" onClick={() => navigate("/documents")}>Documents samples</button>
                </> : <div/> )}
        </div>
    );
}