import { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CustomersContext, InactiveContext } from "../Contexts";

function CustomerFlyway(props) {
    const { customers, setCustomers } = useContext(CustomersContext);
    const { inactiveCustomers, setInactiveCustomers } = useContext(InactiveContext);
    const [isOpen, setIsOpen] = useState(false);
    const flywayRef = useRef(null);
    const customerId = props.customer;

    const handleOutsideClick = (event) => {
        if (flywayRef.current && !flywayRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    const deactivateCustomer = (user) => {
        const userId = user;
        const outgoingCustomer = customers.find((customer) => customer.userID === userId);
        delete outgoingCustomer.boxNumber;
        setInactiveCustomers(prev => [
            ...prev,
            outgoingCustomer
        ]);
        const updatedCustomers = customers.filter(customer => customer.userID !== userId);
        setCustomers(updatedCustomers);
    }

    return(
        <div className="flyawayMenu">
            <button onClick={() => setIsOpen(!isOpen) } className="customerOptions"><span className="material-symbols-outlined">more_horiz</span></button>
            <div ref={flywayRef} className="customerMenu" style={{display: isOpen ? 'block' : 'none'}}>
                <NavLink to="/customerdetails" state={{ customerID: customerId }} >Customer Details</NavLink>
                <button>Customer Pulls</button>
                <button onClick={() => deactivateCustomer(customerId)}>Remove Customer</button>
            </div>
        </div>


    )
}
export default CustomerFlyway;