import { useContext, useState } from "react";
import { UserContext } from "../Contexts";
import AccountToggle from "./AccountToggle";

function Account () {
    const { user, setUser } = useContext(UserContext);

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
            <button onClick={() => {
                setUser(oldUser => ({
                    ...oldUser,
                    customer: oldUser.customer ? false : true,
                }));
                console.log(user);
            }}>
            Switch user type. User is customer? { user.customer ? 'true' : 'false' }</button>
        </>
    )

};

export default Account;