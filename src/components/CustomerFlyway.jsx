import { useState } from "react";

function CustomerFlyway(props) {
    const [isOpen, setIsOpen] = useState(false);
    const customerId = props.customer;


    return(
        <div className="flyawayMenu">
            <button onClick={() => setIsOpen(!isOpen) } className="customerOptions"><span className="material-symbols-outlined">more_horiz</span></button>
            <div className="customerMenu" style={{display: isOpen ? 'block' : 'none'}}>
                <button>Customer Details</button>
                <button>Customer Pulls</button>
                <button>Remove Customer</button>
            </div>
        </div>


    )
}
export default CustomerFlyway;