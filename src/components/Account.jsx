import { useContext, useState } from "react";
import { UserContext } from "../Contexts";
import AccountToggle from "./AccountToggle";

function Account () {
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Account Details for {user.name}</h1>
            <p>Name: </p><AccountToggle label="name" value={ user.name } />
            <p>Email: </p><AccountToggle label="email"  value={ user.email } />
            <p>Phone: </p><AccountToggle label="phone" value={ user.phone } />
            <p>Username: </p><AccountToggle label="username" value={ user.username } />
            <div className="accountEdit">
                <p>User ID: </p><p>{user.userID}</p><div> </div>
            </div>
            <button onClick={() => console.log(user)}>User</button>
        </>
    )

};

export default Account;