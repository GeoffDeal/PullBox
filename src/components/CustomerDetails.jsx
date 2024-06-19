import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { CustomersContext } from "../Contexts";

function CustomerDetails() {
    const { customers, setCustomers } = useContext(CustomersContext);
    const location = useLocation();
    const customerID = location.state.customerID;
    const customer = customers.find(customer => customer.userID === customerID);

    return (
        <div className="customerDetails">
            <h1>{ customer.name }, Box: { customer.boxNumber }</h1>
            <p>Email: { customer.email }</p>
            <p>Phone: { customer.phone }</p>
            <p>{ customer.name }'s Subscriptions:</p>
            {customer.subList ? 
                <ul className="bookSubs">
                    {customer.subList.map((series) => 
                        <li key={series}>
                            <div className="subItem">
                                {series}
                                {/* <button className="removeSeries" onClick={() => removeButton(series)}><span className="material-symbols-outlined">remove</span></button> */}
                            </div>
                        </li>)}
                </ul>
            : <p>None yet</p>}
        </div>
    )
}
export default CustomerDetails;