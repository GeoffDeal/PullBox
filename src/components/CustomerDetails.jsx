import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

function CustomerDetails() {
  const location = useLocation();
  const customerId = location.state.customerId;
  const [customer, setCustomer] = useState();
  const [subs, setSubs] = useState();
  useEffect(() => {
    let cancelled = false;

    const getUser = async () => {
      try {
        const userRes = await api.get(`/users/${customerId}`);
        const subRes = await api.get(`/subs/usersubs?id=${customerId}`);
        if (!cancelled) {
          setCustomer(userRes.data);
          setSubs(subRes.data);
        }
      } catch (err) {
        toast.error(`Problem fetching user information: ${err.message}`);
      }
    };
    getUser();
    return () => {
      cancelled = true;
    };
  }, [customerId]);

  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState(customer?.boxNumber ?? "");

  const boxChange = async (event) => {
    event.preventDefault();
    const currentCustomer = customer;
    const parsedNumber = Math.floor(inputValue);
    if (!isNaN(parsedNumber)) {
      setToggle(false);
      try {
        setCustomer((prev) => ({ ...prev, boxNumber: parsedNumber }));
        await api.patch(`/users/update/${customerId}`, {
          box_number: parsedNumber,
        });
      } catch (err) {
        toast.error("Problem changing box number, try again");
        setCustomer(currentCustomer);
      }
    } else {
      toast.error("Please enter a number");
    }
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
      <p>{customer && `${customer.name}'s Subscriptions:`}</p>
      {subs ? (
        <ul className="bookSubs">
          {subs.map((series) => (
            <li key={series.series_id}>
              <div className="subItem">
                <NavLink
                  to="/seriespage"
                  state={{ seriesId: series.series_id }}
                >
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
