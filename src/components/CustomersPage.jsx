import { useContext, useState } from "react";
import CustomerFlyway from "./CustomerFlyway";
import { CustomersContext, PendingContext } from "../Contexts";

function CustomersPage() {
    const { customers, setCustomers } = useContext(CustomersContext);
    const { pendingCustomers, setPendingCustomer } = useContext(PendingContext);

    const addCustomer = (key) => {
        const customerEmail = key;
        console.log(key, typeof(key))
        const newCustomer = pendingCustomers.find((customer) => customer.email === customerEmail);
        const newId = customers.reduce((largest, obj) => { return obj.userID > largest ? obj.userID : largest}, customers[0].userID);
        newCustomer.userID = newId + 1;
        setCustomers(prev => [
            ...prev,
            newCustomer,
        ]);
    }

    return (
        <>
            <h1>Customers</h1>
            <h3>Current Customers:</h3>
            <div id="customerList" className="customerLists">
                { customers.map((customer) => 
                    <li key={ customer.userID }><div className="customerRow"><div className="customerInnerDiv">
                        <p>{customer.name}</p><p>{customer.boxnumber}</p></div>
                        <CustomerFlyway customer={ customer.userID }/>
                    </div></li>)}
            </div>
            <h3>Pending Customers:</h3>
            <div id="wouldbeCustomers" className="customerLists">
                { pendingCustomers.map((customer) => 
                        <li key={ customer.email }><div className="customerRow">
                            <p>{customer.name}</p>
                            <div className="pendingButtons">
                                <button onClick={() => {addCustomer(customer.email)}} className="customerOptions"><span className="material-symbols-outlined">add</span></button>
                                <button className="customerOptions"><span className="material-symbols-outlined">block</span></button>
                            </div>
                        </div></li>)}
            </div>
        </>
    )
}

export default CustomersPage;