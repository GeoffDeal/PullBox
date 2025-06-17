import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import WeekSelect from "./WeekSelect";
import { findSundays } from "../utils/utilityFunctions";

function Recommended() {
  const [loading, setLoading] = useState(false);
  const [releaseKeys, setReleaseKeys] = useState([]);
  const [focKeys, setFocKeys] = useState([]);

  // Fetch data useeffect
  //   useEffect(() => {

  //   },[]);

  const { lastSunday } = findSundays();
  const [searchParams, setSearchParams] = useSearchParams();
  const weekChange = (day) => {
    if (searchParams.get("date") !== day) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("date", day);
      setSearchParams(newParams);
    }
  };

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
    <div className="pageDisplay">
      <h1>Keys and Recommendations</h1>
      <WeekSelect
        onDataPass={weekChange}
        defaultTime={searchParams.get("date") || lastSunday}
      />
      <h3>On the shelf this week!</h3>
      <div className="imageContainer">
        {releaseKeys.map((book) => (
          <NavLink to={`/bookpage/${book.ID}`} key={book.ID}>
            <img src={book.ImageURL} alt="Comic Cover" />
          </NavLink>
        ))}
      </div>
      <h3>Last chance to order!</h3>
      <div className="imageContainer">
        {focKeys.map((book) => (
          <NavLink to={`/bookpage/${book.ID}`} key={book.ID}>
            <img src={book.ImageURL} alt="Comic Cover" />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Recommended;
