import { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CustomersContext } from "../Contexts";

function CustomerFlyway(props) {
    const { setCustomers } = useContext(CustomersContext);
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

    const deactivateCustomer = (id) => {
        setCustomers(prev => 
            prev.map(user => user.userID === id ? {...user, customerType: 'inactive'} : user)
        )
    }

    return(
        <div className="flyawayMenu" ref={flywayRef}>
            <button onClick={() => setIsOpen(!isOpen) } className={`customerOptions ${isOpen && 'opened'}`}><span className="material-symbols-outlined">keyboard_arrow_down</span></button>
            <div className="customerMenu" style={{display: isOpen ? 'block' : 'none'}}>
                <NavLink className={'flyawayNav'} to="/customerdetails" state={{ customerID: customerId }} >Customer Details</NavLink>
                <NavLink className={'flyawayNav'} to="/pulls" state={{ customerID: customerId }} >Customer Pulls</NavLink>
                <button onClick={() => deactivateCustomer(customerId)}>Remove Customer</button>
            </div>
        </div>


    )
}
export default CustomerFlyway;