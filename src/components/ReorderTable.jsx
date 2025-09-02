import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuthHeader } from "../utils/authHeaderSetter";
import { toast } from "react-toastify";

export default function ReordersTable({ endpoint, names }) {
  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const getHeaders = useAuthHeader();

  useEffect(() => {
    let cancelled = false;
    async function getReorders() {
      try {
        const headers = await getHeaders();
        const res = await api.get(endpoint, {
          headers,
        });
        if (!cancelled) setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching reorders: ${err.message}`);
      }
    }
    getReorders();
    return () => {
      cancelled = true;
    };
  }, [getHeaders, endpoint]);

  // Sorting logic
  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "orderDate" || sortConfig.key === "requestDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  //Change reorder status
  const statusChange = async (e, orderId) => {
    try {
      const newStatus = e.target.value;
      const headers = await getHeaders();
      await api.patch(
        `/reorders/changereorderstatus/${orderId}`,
        { orderStatus: newStatus },
        {
          headers,
        }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, orderStatus: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(`Problem changing reorder status: ${err.message}`);
    }
  };

  return (
    <div className="tableDiv">
      <table className="reorderTable">
        <thead>
          <tr className="bg-gray-100">
            {names && (
              <th className="tableHeader">
                <button onClick={() => handleSort("userName")}>
                  Customer{renderSortArrow("userName")}
                </button>
              </th>
            )}
            <th className="tableHeader">
              <button onClick={() => handleSort("product")}>
                Product{renderSortArrow("product")}
              </button>
            </th>
            <th className="tableHeader">Notes</th>
            <th className="tableHeader">
              <button onClick={() => handleSort("orderDate")}>
                Order Date{renderSortArrow("orderDate")}
              </button>
            </th>
            <th className="tableHeader">
              <button onClick={() => handleSort("requestDate")}>
                Request Date{renderSortArrow("requestDate")}
              </button>
            </th>
            <th className="tableHeader">
              <button onClick={() => handleSort("orderStatus")}>
                Status{renderSortArrow("orderStatus")}
              </button>
            </th>
            <th className="tableHeader">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((o) => (
            <tr key={o.id}>
              {names && <td className="tableCell">{o.userName}</td>}
              <td className="tableCell">{o.product}</td>
              <td className="tableCell">{o.notes}</td>
              <td className="tableCell">{o.orderDate}</td>
              <td className="tableCell">{o.requestDate}</td>
              <td className="tableCell">
                <select
                  onChange={(e) => statusChange(e, o.id)}
                  value={o.orderStatus}
                >
                  <option value={"ordered"}>Ordered</option>
                  <option value={"unavailable"}>Unavailable</option>
                  <option value={"complete"}>Complete</option>
                </select>
              </td>
              <td className="tableCell">{o.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
