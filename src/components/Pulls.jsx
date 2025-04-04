import { useContext, useEffect, useState } from "react";
import { UserContext, CustomersContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import WeekSelect from "./WeekSelect";
import { useLocation, useSearchParams, NavLink } from "react-router-dom";
import { findSundays } from "../utils/utilityFunctions";
import { confirmToast } from "../utils/toasts.jsx";
import api from "../api/api";
import { toast } from "react-toastify";

function Pulls() {
  const { user } = useContext(UserContext);
  const { customers } = useContext(CustomersContext);
  const location = useLocation();
  const customerID = location.state ? location.state.customerID : null;
  const currentUser = customerID
    ? customers.find((user) => user.userID === customerID)
    : user;

  //Subscriptions

  const [subs, setSubs] = useState([]);
  useEffect(() => {
    let cancelled = false;

    const getSubscriptions = async () => {
      try {
        const res = await api.get(`/subs/usersubs?id=${user.id}`);
        console.log(res);
        if (!cancelled) setSubs(res.data);
      } catch (err) {
        toast.error(`Problem fetching subscriptions: ${err.message}`);
      }
    };
    getSubscriptions();
    return () => {
      cancelled = true;
    };
  }, [user.id]);

  const removeSub = async (subId) => {
    const prevSubs = subs;
    async function deleteSub() {
      try {
        const newSubs = subs.filter((sub) => sub.id !== subId);
        setSubs(newSubs);
        await api.delete(`/subs/removesub/${subId}`);
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
        {customerID ? currentUser.name + `'s` : "Your"} pulls for the week of
      </h3>
      <WeekSelect
        onDataPass={weekChange}
        defaultTime={searchParams.get("date") || lastSunday}
      />

      <ComicsDisplay date={searchParams.get("date") || lastSunday} />
      <h3>
        {customerID ? currentUser.name + `'s` : "Your"} subscription list:
      </h3>
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

                {!customerID && (
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
