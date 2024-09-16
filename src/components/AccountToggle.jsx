import { useState, useContext } from "react";
import { UserContext } from "../Contexts";

function AccountToggle(props) {
    const label = props.label;
    const userValue = props.value;
    const [toggle, setToggle] = useState(false);
    const { setUser } = useContext(UserContext);
    const [inputValue, setInputValue] = useState(userValue);

    const userSubmit = (event) => {
        event.preventDefault();
        setUser((oldUser) => ({
            ...oldUser,
            [label]: inputValue,
        }));

        setToggle(false);
    }

    return (
        <div className="accountEdit">
            {toggle ? 
                <form onSubmit={ userSubmit }>
                    <input type="text" value={ inputValue } onChange={(e) => {
                        setInputValue(e.target.value)}}></input> 
                </form>
                : <p>{ userValue }</p>}
            <button className="accountButton" onClick={() => setToggle(!toggle)}><span className="material-symbols-outlined">edit_note</span></button>
        </div>
    )
}

export default AccountToggle;