import { useEffect, useState } from "react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";
import { toast } from "react-toastify";
import api from "../api/api.js";

function CustomerDropdown({ onUpdate, customerValue }) {
  const getHeaders = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const getCustomers = async () => {
      try {
        const headers = await getHeaders();
        const res = await api.get("users/customers", { headers });
        if (!cancelled) setCustomers(res.data);
      } catch (err) {
        toast.error(`Problem fetching customers: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
    return () => {
      cancelled = true;
    };
  }, [getHeaders]);

  return (
    <div>
      <label htmlFor="customerSelect">Choose a customer: </label>
      <select
        id="customerSelect"
        value={customerValue}
        onChange={onUpdate}
        disabled={loading}
      >
        <option value="">-- Select --</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default CustomerDropdown;
