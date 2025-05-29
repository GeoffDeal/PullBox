import { useEffect, useState } from "react";
import api from "../api/api.js";
import { toast } from "react-toastify";
import { twelveHourFormat } from "../utils/utilityFunctions.js";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

const StoreInfo = () => {
  const [storeInfo, setStoreInfo] = useState();
  const getHeaders = useAuthHeader();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const getInfo = async () => {
      try {
        const headers = await getHeaders();
        const res = await api.get("/storeinfo", { headers });
        if (!cancelled) setStoreInfo(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching info: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    getInfo();
    return () => {
      cancelled = true;
    };
  }, [getHeaders]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (loading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

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
