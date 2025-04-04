import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function CustomerFlyway({ customer, deactivateCustomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const flywayRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (flywayRef.current && !flywayRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flyawayMenu" ref={flywayRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`customerOptions ${isOpen && "opened"}`}
      >
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </button>
      <div
        className="customerMenu"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <NavLink
          className={"flyawayNav"}
          to="/customerdetails"
          state={{ customerId: customer }}
        >
          Customer Details
        </NavLink>
        <NavLink
          className={"flyawayNav"}
          to="/pulls"
          state={{ customerId: customer }}
        >
          Customer Pulls
        </NavLink>
        <button onClick={() => deactivateCustomer(customer, "inactive")}>
          Remove Customer
        </button>
      </div>
    </div>
  );
}
export default CustomerFlyway;
