import { useState, useEffect, useRef } from "react";

function CustomerFlyway(props) {
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

    return(
        <div className="flyawayMenu">
            <button onClick={() => setIsOpen(!isOpen) } className="customerOptions"><span className="material-symbols-outlined">more_horiz</span></button>
            <div ref={flywayRef} className="customerMenu" style={{display: isOpen ? 'block' : 'none'}}>
                <button>Customer Details</button>
                <button>Customer Pulls</button>
                <button>Remove Customer</button>
            </div>
        </div>


    )
}
export default CustomerFlyway;