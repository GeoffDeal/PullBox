import { useState } from "react";

const WeekSelect = ({ onDataPass, defaultTime }) => {
  const now = new Date();
  const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
  const defaultSunday = defaultTime ? new Date(defaultTime) : null;
  const [sunday, setSunday] = useState(
    defaultTime ? defaultSunday : lastSunday
  );
  const futureWeek = () => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + 7);
    setSunday(day);
    onDataPass(day);
  };
  const pastWeek = () => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() - 7);
    setSunday(day);
    onDataPass(day);
  };
  return (
    <div className="weekSelector">
      <button onClick={pastWeek} className="weekSelectors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <p>{sunday.toLocaleDateString("en-CA")}</p>
      <button onClick={futureWeek} className="weekSelectors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default WeekSelect;
