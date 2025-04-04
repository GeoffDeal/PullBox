import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

function CustomerDetails() {
  const location = useLocation();
  const customerId = location.state.customerId;
  const [customer, setCustomer] = useState();
  useEffect(() => {
    let cancelled = false;

    const getUser = async () => {
      try {
        const res = await api.get(`/users/${customerId}`);
        if (!cancelled) setCustomer(res.data);
      } catch (err) {
        toast.error(`Problem feteching user: ${err.message}`);
      }
    };
    getUser();
    return () => {
      cancelled = true;
    };
  }, [customerId]);

  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState(customer?.boxNumber ?? "");

  const boxChange = (event) => {
    event.preventDefault();
    const parsedNumber = Math.floor(inputValue);
    if (!isNaN(parsedNumber)) {
      customer.boxNumber = parsedNumber;
    } else {
      alert("Please enter a number");
    }
    setToggle(false);
  };

  return (
    <div className="customerDetails pageDisplay">
      <h1>{customer && customer.name}</h1>
      <div className="boxEdit">
        <h3>Box:</h3>
        {toggle ? (
          <form onSubmit={boxChange}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
          </form>
        ) : (
          <p>{customer && customer.boxNumber}</p>
        )}
        <button className="editButton" onClick={() => setToggle(!toggle)}>
          <span className="material-symbols-outlined">edit_note</span>
        </button>
      </div>
      <p>Email: {customer && customer.email}</p>
      <p>Phone: {customer && customer.phone}</p>
      <p>{customer && customer.name}'s Subscriptions:</p>
      {customer && customer.subList ? (
        <ul className="bookSubs">
          {customer.subList.map((series) => (
            <li key={series.skus[0]}>
              <div className="subItem">
                <NavLink to="/seriespage" state={{ sku: series.skus[0] }}>
                  {series.name}
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>None yet</p>
      )}
    </div>
  );
}
export default CustomerDetails;
