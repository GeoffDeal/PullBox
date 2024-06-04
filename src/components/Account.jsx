import { useContext, useState } from "react";
import { UserContext } from "../Contexts";

function Account () {
    const userData = useContext(UserContext);
    const [user, setUser] = useState(userData.user);
    const [nameToggle, setNameToggle] = useState(false);

    return (
        <>
            <h1>Account Details for {user.username}</h1>
            <div className="accountEdit">
                <p>Name: </p> 
                    {nameToggle ? <input type="text"></input> : <p>{user.firstName + ' ' + user.lastName}</p>}
                <button className="accountButton" onClick={() => setNameToggle(true)}><span class="material-symbols-outlined">edit_note</span></button>
            </div>
            <div className="accountEdit">
                <p>Email: {user.email}</p>
                <button className="accountButton"><span class="material-symbols-outlined">edit_note</span></button>
            </div>
            <div className="accountEdit">
                <p>Phone: {user.phone}</p>
                <button className="accountButton"><span class="material-symbols-outlined">edit_note</span></button>
            </div>
            <div className="accountEdit">
                <p>Username: {user.username}</p>
                <button className="accountButton"><span class="material-symbols-outlined">edit_note</span></button>
            </div>
            <p>User ID: {user.userID}</p>
        </>
    )

};

export default Account;