import { useContext } from "react";
import { UserContext, CustomersContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import WeekSelect from "./WeekSelect";
import { useLocation, useSearchParams, NavLink } from "react-router-dom";
import { findSundays } from "../utils/utilityFunctions";

function Pulls() {
  const { user, setUser } = useContext(UserContext);
  const { customers } = useContext(CustomersContext);
  const location = useLocation();
  const customerID = location.state ? location.state.customerID : null;
  const currentUser = customerID
    ? customers.find((user) => user.userID === customerID)
    : user;

  const removeSub = (series) => {
    const confirmBox = window.confirm(
      "Are you sure you wish to remove this subscription and associated pulls?"
    );

    if (confirmBox === true) {
      const updatedSubs = user.subList.filter((sub) => sub !== series);
      setUser((user) => ({
        ...user,
        subList: updatedSubs,
      }));
    }
  };

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
        {currentUser.subList.map((series, index) => (
          <li key={index}>
            <div className="subItem">
              <NavLink to="/seriespage" state={{ sku: series.skus[0] }}>
                {series.name}
              </NavLink>

              {!customerID && (
                <button
                  className="removeSeries"
                  onClick={() => removeSub(series)}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pulls;
