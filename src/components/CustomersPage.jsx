import { useEffect, useState } from "react";
import CustomerFlyway from "./CustomerFlyway";
import { toast } from "react-toastify";
import api from "../api/api.js";

function CustomersPage() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    let cancelled = false;

    const getCustomers = async () => {
      try {
        const res = await api.get("users/customers");
        if (!cancelled) setCustomers(res.data);
      } catch (err) {
        toast.error(`Problem fetching customers: ${err.message}`);
      }
    };
    getCustomers();
    return () => {
      cancelled = true;
    };
  }, []);

  const addCustomer = (key) => {
    setCustomers((prev) =>
      prev.map((user) =>
        user.userID === key ? { ...user, customerType: "active" } : user
      )
    );
  };
  const rejectCustomer = (key) => {
    setCustomers((prev) =>
      prev.map((user) =>
        user.userID === key ? { ...user, customerType: "inactive" } : user
      )
    );
  };
  const restoreCustomer = (key) => {
    setCustomers((prev) =>
      prev.map((user) =>
        user.userID === key ? { ...user, customerType: "active" } : user
      )
    );
  };

  return (
    <div className="pageDisplay">
      <h1>Customers</h1>
      <h3>Current Customers:</h3>
      <div id="customerList" className="customerLists">
        {customers &&
          customers
            .filter((customer) => customer.customerType === "active")
            .map((customer) => (
              <li key={customer.id}>
                <div className="customerRow">
                  <div className="customerInnerDiv">
                    <p>{customer.name}</p>
                    <p>{customer.boxNumber}</p>
                  </div>
                  <CustomerFlyway customer={customer.id} />
                </div>
              </li>
            ))}
      </div>
      <h3>Pending Customers:</h3>
      <div id="wouldbeCustomers" className="customerLists">
        {customers &&
          customers
            .filter((customer) => customer.customerType === "pending")
            .map((customer) => (
              <li key={customer.id}>
                <div className="customerRow">
                  <p>{customer.name}</p>
                  <div className="pendingButtons">
                    <button
                      onClick={() => {
                        addCustomer(customer.id);
                      }}
                      className="customerOptions"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <button
                      onClick={() => {
                        rejectCustomer(customer.id);
                      }}
                      className="customerOptions"
                    >
                      <span className="material-symbols-outlined">block</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
      </div>
      <h3>Inactive Customers:</h3>
      <div className="customerLists">
        {customers &&
          customers
            .filter((customer) => customer.customerType === "inactive")
            .map((customer) => (
              <li key={customer.id}>
                <div className="customerRow">
                  <p>{customer.name}</p>
                  <button
                    onClick={() => restoreCustomer(customer.id)}
                    className="customerOptions"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </li>
            ))}
      </div>
    </div>
  );
}

export default CustomersPage;
