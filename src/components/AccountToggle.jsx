import { useState, useContext } from "react";
import { UserContext } from "../Contexts";

function AccountToggle(props) {
    const label = props.label;
    const userValue = props.value;
    const [toggle, setToggle] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [inputValue, setInputValue] = useState(userValue);

    const userSubmit = (event) => {
        event.preventDefault();
        console.log(inputValue);
        setUser((oldUser) => ({
            ...oldUser,
            [label]: inputValue,
        }));
        console.log(user);

        setToggle(false);
    }

    return (
        <div className="accountEdit">
            {toggle ? 
                <form onSubmit={ userSubmit }>
                    <input type="text" value={ inputValue } onChange={(e) => {
                        setInputValue(e.target.value);
                        console.log(inputValue)}}></input> 
                </form>
                : <p>{ userValue }</p>}
            <button className="accountButton" onClick={() => setToggle(true)}><span className="material-symbols-outlined">edit_note</span></button>
        </div>
    )
}

export default AccountToggle;