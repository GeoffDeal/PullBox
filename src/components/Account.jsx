import { useContext } from "react";
import { UserContext } from "../Contexts";
import AccountToggle from "./AccountToggle";

function Account () {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="accountPage pageDisplay">
            <h1>Account Details for {user.name}</h1>
            <h3 className="accountHeader">Name: </h3><AccountToggle label="name" value={ user.name } />
            <h3 className="accountHeader">Email: </h3><AccountToggle label="email"  value={ user.email } />
            <h3 className="accountHeader">Phone: </h3><AccountToggle label="phone" value={ user.phone } />
            <h3 className="accountHeader">Boxnumber: </h3><p>{ user.boxNumber }</p>
            <div className="accountEdit">
                <h3>User ID: </h3><p>{user.userID}</p><div> </div>
            </div>
            <button onClick={() => {
                setUser(oldUser => ({
                    ...oldUser,
                    customer: oldUser.customer ? false : true,
                }));
            }}>
            Switch user type. User is customer? { user.customer ? 'true' : 'false' }</button>
        </div>
    )

};

export default Account;