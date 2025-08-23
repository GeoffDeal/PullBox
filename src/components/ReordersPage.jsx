import { useEffect, useState } from "react";
import CustomerDropdown from "./CustomerDropdown";
import api from "../api/api";
import { useAuthHeader } from "../utils/authHeaderSetter";
import { toast } from "react-toastify";

function ReordersPage() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [notes, setNotes] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("ordered");
  const getHeaders = useAuthHeader();

  useEffect(() => {
    const now = new Date();
    setOrderDate(now.toLocaleString("en-CA").split(",")[0]);
    setRequestDate(now.toISOString().split("T")[0]);
  }, []);

  const updateCustomer = (e) => {
    setCustomer(e.target.value);
  };
  const updateProduct = (e) => {
    setProduct(e.target.value);
  };
  const updateNotes = (e) => {
    setNotes(e.target.value);
  };
  const reorderSubmit = async (event) => {
    event.preventDefault();
    const reorderData = {
      userId: customer,
      product,
      notes,
      orderDate,
      requestDate,
      orderStatus,
    };

    try {
      const headers = await getHeaders();
      await api.post("/reorders/addreorder", reorderData, {
        headers,
      });
      toast.success("Reorder Added");
      setCustomer("");
      setProduct("");
      setNotes("");
      setRequestDate("");
      setOrderStatus("ordered");
    } catch (err) {
      console.error(err);
      toast.error("Error adding reorder");
    }
  };

  return (
    <div className="pageDisplay">
      <h1>Reorders</h1>
      <div className="addOrder">
        <h3>Add New Order</h3>
        <form id="orderForm" onSubmit={reorderSubmit}>
          <p>Current Date: {orderDate && orderDate}</p>
          <label htmlFor="requestDate">Date of Request:</label>
          <input
            id="requestDate"
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
          />
          <CustomerDropdown
            onUpdate={updateCustomer}
            customerValue={customer}
          />
          <label htmlFor={"productOrder"}>Product: </label>
          <input
            id="productOrder"
            type="text"
            value={product}
            placeholder="Product title..."
            onChange={updateProduct}
          />
          <label htmlFor="orderNotes">Notes: </label>
          <input
            id="orderNotes"
            type="textarea"
            value={notes}
            placeholder="Notes..."
            onChange={updateNotes}
          />
          <label htmlFor="orderStatus">Status: </label>
          <select
            name="orderStatus"
            id="orderStatus"
            onChange={(e) => setOrderStatus(e.target.value)}
            value={orderStatus}
          >
            <option value="ordered">Ordered</option>
            <option value="unavailable">Unavailable</option>
            <option value="complete">Complete</option>
          </select>
          <input type="submit" value={"Submit"} id="orderSubmit" />
        </form>
      </div>
    </div>
  );
}
export default ReordersPage;
