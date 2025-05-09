import { useEffect, useState } from "react";
import api from "../api/api.js";
import { toast } from "react-toastify";
import { twelveHourFormat } from "../utils/utilityFunctions.js";

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

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="storeInfoPage pageDisplay">
      {storeInfo ? (
        <div>
          <h1>Store Information</h1>
          {storeInfo.phone && <p>Phone number: {storeInfo.phone}</p>}
          {storeInfo.address && <p>Address: {storeInfo.address}</p>}
          {storeInfo.email && <p>Email: {storeInfo.email}</p>}
          <h3>Store Hours</h3>
          {storeInfo.hours &&
            weekdays.map((day) => {
              const openKey = day.toLowerCase() + "open";
              const closeKey = day.toLowerCase() + "close";
              return (
                <div key={day} className="hoursDisplay">
                  <p>
                    {day}: {twelveHourFormat(storeInfo.hours[openKey])} -{" "}
                    {twelveHourFormat(storeInfo.hours[closeKey])}
                  </p>
                </div>
              );
            })}
        </div>
      ) : (
        <p>Information unavailable</p>
      )}
    </div>
  );
};
export default StoreInfo;
