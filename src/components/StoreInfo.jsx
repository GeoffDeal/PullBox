import { useEffect, useState } from "react";
import api from "../api/api.js";
import { toast } from "react-toastify";

const StoreInfo = () => {
  const [storeInfo, setStoreInfo] = useState();

  useEffect(() => {
    let cancelled = false;

    const getInfo = async () => {
      try {
        const res = await api.get("/storeinfo");
        if (!cancelled) setStoreInfo(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching info: ${err.message}`);
      }
    };
    getInfo();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="storeInfoPage pageDisplay">
      {storeInfo ? (
        <div>
          <h1>Store Information</h1>
          {storeInfo.phone && <p>Phone number: {storeInfo.phone}</p>}
          {storeInfo.address && <p>Address: {storeInfo.address}</p>}
          {storeInfo.email && <p>Email: {storeInfo.email}</p>}
          <h3>Store Hours</h3>
          <p>
            Sunday:{" "}
            {storeInfo.hours.sundayopen
              ? `${storeInfo.hours.sundayopen} - ${storeInfo.hours.sundayclose}`
              : "Closed"}
          </p>
          <p>
            Monday:{" "}
            {storeInfo.hours.mondayopen
              ? `${storeInfo.hours.mondayopen} - ${storeInfo.hours.mondayclose}`
              : "Closed"}
          </p>
          <p>
            Tuesday:{" "}
            {storeInfo.hours.tuesdayopen
              ? `${storeInfo.hours.tuesdayopen} - ${storeInfo.hours.tuesdayclose}`
              : "Closed"}
          </p>
          <p>
            Wednesday:{" "}
            {storeInfo.hours.wednesdayopen
              ? `${storeInfo.hours.wednesdayopen} - ${storeInfo.hours.wednesdayclose}`
              : "Closed"}
          </p>
          <p>
            Thursday:{" "}
            {storeInfo.hours.thursdayopen
              ? `${storeInfo.hours.thursdayopen} - ${storeInfo.hours.thursdayclose}`
              : "Closed"}
          </p>
          <p>
            Friday:{" "}
            {storeInfo.hours.fridayopen
              ? `${storeInfo.hours.fridayopen} - ${storeInfo.hours.fridayclose}`
              : "Closed"}
          </p>
          <p>
            Saturday:{" "}
            {storeInfo.hours.saturdayopen
              ? `${storeInfo.hours.saturdayopen} - ${storeInfo.hours.saturdayclose}`
              : "Closed"}
          </p>
        </div>
      ) : (
        <p>Information unavailable</p>
      )}
    </div>
  );
};
export default StoreInfo;
