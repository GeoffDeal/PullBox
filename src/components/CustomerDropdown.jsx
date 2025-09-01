import { useEffect, useState, useRef } from "react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";
import { toast } from "react-toastify";
import api from "../api/api.js";

function CustomerDropdown({ onUpdate, value }) {
  const getHeaders = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(value?.name?.toLowerCase() || "")
  );

  const handleSelect = (customer) => {
    setIsOpen(false);
    onUpdate({
      target: {
        value: { id: customer.id || null, name: customer.name || null },
      },
    });
  };
  const handleInputChange = (e) => {
    const typedName = e.target.value;

    onUpdate({ target: { value: { id: null, name: typedName } } });

    setIsOpen(true);
  };
  const handleBlur = () => {
    if (!value?.name) return;

    const match = customers.find(
      (c) => c.name.toLowerCase() === value.name.toLowerCase()
    );

    if (match) {
      onUpdate({
        target: {
          value: { id: match.id, name: match.name },
        },
      });
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "250px" }}>
      <label htmlFor="customerCombo">Choose a customer: </label>
      <input
        id="customerCombo"
        type="text"
        placeholder={loading ? "Loading..." : "-- Select or type --"}
        value={value?.name || ""}
        disabled={loading}
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {isOpen && filteredCustomers.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "150px",
            overflowY: "auto",
            background: "white",
            border: "1px solid #ccc",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
          }}
        >
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => handleSelect(customer)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#eee")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerDropdown;
