import { useContext } from "react";
import { UserContext } from "../Contexts";

function Account () {
    const user = useContext(UserContext);

    return (
        <>
            <h1>Account Details for {user.username}</h1>
            <p>Name: {user.firstName + ' ' + user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>User ID: {user.userID}</p>
            <button>Update account info</button>
        </>
    )

};

export default Account;