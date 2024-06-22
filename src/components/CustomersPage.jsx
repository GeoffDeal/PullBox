import { useContext, useState } from "react";
import CustomerFlyway from "./CustomerFlyway";
import { CustomersContext, PendingContext, InactiveContext } from "../Contexts";

function CustomersPage() {
    const { customers, setCustomers } = useContext(CustomersContext);
    const { pendingCustomers, setPendingCustomer } = useContext(PendingContext);
    const { inactiveCustomers, setInactiveCustomers } = useContext(InactiveContext);

    const generateID = () => {
        const allCustomers = [...customers, ...inactiveCustomers];
        let newId = allCustomers.reduce((largest, obj) => { return obj.userID > largest ? obj.userID : largest}, customers[0].userID);
        newId += 1;
        return newId
    }
    const addCustomer = (key) => {
        const customerEmail = key;
        const newCustomer = pendingCustomers.find((customer) => customer.email === customerEmail);
        newCustomer.userID = generateID();
        setCustomers(prev => [
            ...prev,
            newCustomer,
        ]);
        const updatedPending = pendingCustomers.filter(customer => customer.email !== customerEmail);
        setPendingCustomer(updatedPending);
    }
    const rejectCustomer = (key) => {
        const customerEmail = key;
        const rejectedCustomer = pendingCustomers.find(customer => customer.email === customerEmail);
        setInactiveCustomers(prev => [
            ...prev,
            rejectedCustomer,
        ]);
        const updatedPending = pendingCustomers.filter(customer => customer.email !== customerEmail);
        setPendingCustomer(updatedPending);
    }
    const restoreCustomer = (key) => {
        const customerEmail = key;
        const restoredCustomer = inactiveCustomers.find(customer => customer.email === customerEmail);
        restoredCustomer.userID = restoredCustomer.userID || generateID();
        setCustomers(prev => [
            ...prev,
            restoredCustomer,
        ])
        const updatedInactive = inactiveCustomers.filter(customer => customer.email !== customerEmail);
        setInactiveCustomers(updatedInactive);
    }
    // const deactivateCustomer = (user) => {
    //     const userId = user;
    //     const outgoingCustomer = customers.find((customer) => customer.userID === userId);
    //     delete outgoingCustomer.boxNumber;
    //     setInactiveCustomers(prev => [
    //         ...prev,
    //         outgoingCustomer
    //     ]);
    //     const updatedCustomers = customers.filter(customer => customer.userID !== userId);
    //     setCustomers(updatedCustomers);
    // }

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
                                <button onClick={() => {rejectCustomer(customer.email)}}  className="customerOptions"><span className="material-symbols-outlined">block</span></button>
                            </div>
                        </div></li>)}
            </div>
            <h3>Inactive Customers:</h3>
            <div className="customerLists">
                { inactiveCustomers.map((customer) => 
                    <li key={ customer.email }><div className="customerRow">
                        <p>{customer.name}</p>
                        <button onClick={() => restoreCustomer(customer.email)} className="customerOptions"><span className="material-symbols-outlined">add</span></button>
                    </div></li>)}
            </div>
        </>
    )
}

export default CustomersPage;