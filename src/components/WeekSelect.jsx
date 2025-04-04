import { useState } from "react";
import { findSundays, localDateObj } from "../utils/utilityFunctions.js";

const WeekSelect = ({ onDataPass, defaultTime }) => {
  let { lastSunday } = findSundays();
  const defaultSunday = defaultTime ? defaultTime : null;
  const [sunday, setSunday] = useState(
    defaultTime ? defaultSunday : lastSunday
  );
  const futureWeek = () => {
    const dateObj = localDateObj(sunday);
    dateObj.setDate(dateObj.getDate() + 7);
    const formattedDay = dateObj.toLocaleDateString("en-CA");
    setSunday(formattedDay);
    onDataPass(formattedDay);
  };
  const pastWeek = () => {
    const dateObj = localDateObj(sunday);
    dateObj.setDate(dateObj.getDate() - 7);
    const formattedDay = dateObj.toLocaleDateString("en-CA");
    setSunday(formattedDay);
    onDataPass(formattedDay);
  };
  return (
    <div className="weekSelector">
      <button onClick={pastWeek} className="weekSelectors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <p>Week of {sunday}</p>
      <button onClick={futureWeek} className="weekSelectors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default WeekSelect;
