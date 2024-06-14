import { useContext, useState } from "react";
import CustomerFlyway from "./CustomerFlyway";
import { CustomersContext, PendingContext } from "../Contexts";

function CustomersPage() {
    const { customers, setCustomers } = useContext(CustomersContext);
    const { pendingCustomers, setPendingCustomer } = useContext(PendingContext);

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
                                <button className="customerOptions"><span className="material-symbols-outlined">add</span></button>
                                <button className="customerOptions"><span className="material-symbols-outlined">block</span></button>
                            </div>
                        </div></li>)}
            </div>
        </>
    )
}

export default CustomersPage;