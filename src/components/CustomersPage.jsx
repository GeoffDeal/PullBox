import { useEffect, useState } from "react";
import CustomerFlyway from "./CustomerFlyway";
import { toast } from "react-toastify";
import api from "../api/api.js";
import { useUser } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

function CustomersPage() {
  const { user, isLoaded } = useUser();
  const getHeaders = useAuthHeader();
  const [customers, setCustomers] = useState();

  useEffect(() => {
    let cancelled = false;

    const getCustomers = async () => {
      try {
        const headers = await getHeaders();
        const res = await api.get("users/customers", { headers });
        if (!cancelled) setCustomers(res.data);
      } catch (err) {
        toast.error(`Problem fetching customers: ${err.message}`);
      }
    };
    getCustomers();
    return () => {
      cancelled = true;
    };
  }, [getHeaders]);

  const customerStatus = async (key, newStatus) => {
    const currentCustomers = [...customers];
    try {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === key
            ? { ...customer, customerType: newStatus }
            : customer
        )
      );
      const headers = await getHeaders();
      await api.patch(
        `/users/status/${key}`,
        { status: newStatus },
        { headers }
      );
    } catch (err) {
      toast.error("Problem changing customer status, try again");
      setCustomers(currentCustomers);
    }
  };

  // Auth admin check
  if (!isLoaded) return <div className="loadingText">Loading...</div>;

  const role = user?.publicMetadata?.role;
  if (role !== "admin")
    return <div className="adminWarning">Admin privledges required</div>;

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
                  <CustomerFlyway
                    customer={customer.id}
                    customerName={customer.name}
                    deactivateCustomer={customerStatus}
                  />
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
                        customerStatus(customer.id, "active");
                      }}
                      className="customerOptions"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <button
                      onClick={() => {
                        customerStatus(customer.id, "inactive");
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
                    onClick={() => customerStatus(customer.id, "active")}
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
