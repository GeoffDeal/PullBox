import { useEffect, useState } from "react";
import ComicsDisplay from "./ComicDisplay";
import WeekSelect from "./WeekSelect";
import { useLocation, useSearchParams, NavLink } from "react-router-dom";
import { findSundays } from "../utils/utilityFunctions";
import { confirmToast } from "../utils/toasts.jsx";
import api from "../api/api";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

function Pulls() {
  const { user } = useUser();
  const location = useLocation();
  const [customerId] = useState(location.state?.customerId || user.id);
  const [customerName] = useState(location.state?.customerName || null);
  const getHeaders = useAuthHeader();

  //Subscriptions

  const [subs, setSubs] = useState([]);
  useEffect(() => {
    let cancelled = false;

    const getSubscriptions = async () => {
      try {
        const headers = await getHeaders();
        const res = await api.get(`/subs/usersubs?id=${customerId}`, {
          headers,
        });
        if (!cancelled) setSubs(res.data);
      } catch (err) {
        toast.error(`Problem fetching subscriptions: ${err.message}`);
      }
    };
    getSubscriptions();
    return () => {
      cancelled = true;
    };
  }, [customerId, getHeaders]);

  const removeSub = async (subId) => {
    const prevSubs = subs;
    async function deleteSub() {
      try {
        const headers = await getHeaders();
        const newSubs = subs.filter((sub) => sub.id !== subId);
        setSubs(newSubs);
        await api.delete(`/subs/removesub/${subId}`, { headers });
      } catch (err) {
        toast.error("Problem removing subscription, try again");
        setSubs(prevSubs);
      }
    }
    confirmToast(
      deleteSub,
      "Are you sure you wish to remove sub and associated pulls?"
    );
  };

  // Weekly pulls
  const { lastSunday } = findSundays();
  const [searchParams, setSearchParams] = useSearchParams();
  const weekChange = (day) => {
    if (searchParams.get("date") !== day) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("date", day);
      setSearchParams(newParams);
    }
  };

  return (
    <div className="pageDisplay">
      <h1>Pulls and Subs</h1>
      <h3>
        {customerName ? customerName + `'s` : "Your"} pulls for the week of
      </h3>
      <WeekSelect
        onDataPass={weekChange}
        defaultTime={searchParams.get("date") || lastSunday}
      />

      <ComicsDisplay date={searchParams.get("date") || lastSunday} />
      <h3>{customerName ? customerName + `'s` : "Your"} subscription list:</h3>
      <ul className="bookSubs">
        {subs ? (
          subs.map((series, index) => (
            <li key={index}>
              <div className="subItem">
                <NavLink
                  to="/seriespage"
                  state={{ seriesId: series.series_id }}
                >
                  {series.name}
                </NavLink>

                {!customerName && (
                  <button
                    className="removeSeries"
                    onClick={() => removeSub(series.id)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No subscriptions found</p>
        )}
      </ul>
    </div>
  );
}

export default Pulls;
