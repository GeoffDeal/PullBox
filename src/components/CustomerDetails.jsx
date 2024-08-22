import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CustomersContext } from "../Contexts";

function CustomerDetails() {
    const { customers, setCustomers } = useContext(CustomersContext);
    const location = useLocation();
    const customerID = location.state.customerID;
    const customer = customers.find(customer => customer.userID === customerID);

    const [toggle, setToggle] = useState(false);
    const [inputValue, setInputValue] = useState(customer.boxNumber);

    const boxChange = (event) => {
        event.preventDefault();
        const parsedNumber = Math.floor(inputValue);
        if (!isNaN(parsedNumber)) {
            customer.boxNumber = parsedNumber;
            const others = customers.filter(customer => customer.userID !== customerID);
            const updatedCustomers = [...others, customer];
            setCustomers(updatedCustomers);
        }else {
            alert('Please enter a number')
        }
        setToggle(false);
    }

    return (
        <div className="customerDetails pageDisplay">
            <h1>{ customer.name }</h1>
            <div className="boxEdit">
                <h3>Box:</h3>
                {toggle ? 
                    <form onSubmit={ boxChange }>
                        <input type="text" value={ inputValue } onChange={(e) => {
                            setInputValue(e.target.value)}}></input> 
                    </form>
                    : <p>{ customer.boxNumber }</p>}
                <button className="editButton" onClick={() => setToggle(!toggle)}><span className="material-symbols-outlined">edit_note</span></button>
            </div>
            <p>Email: { customer.email }</p>
            <p>Phone: { customer.phone }</p>
            <p>{ customer.name }'s Subscriptions:</p>
            {customer.subList ? 
                <ul className="bookSubs">
                    {customer.subList.map((series) => 
                        <li key={series}>
                            <div className="subItem">
                                {series}
                            </div>
                        </li>)}
                </ul>
            : <p>None yet</p>}
        </div>
    )
}
export default CustomerDetails;