import { useState } from "react";
import { calcWeek } from "./ComicDisplay";

const WeekSelect = ({ onDataPass }) => {
    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

    const [ sunday, setSunday ] = useState(lastSunday);
    const futureWeek = () => {
        const day = new Date (sunday);
        day.setDate(sunday.getDate() + 7);
        setSunday(day);
        const timestamp = calcWeek(day);
        onDataPass(timestamp);
    }
    const pastWeek = () => {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() - 7);
        setSunday(day);
        const timestamp = calcWeek(day);
        onDataPass(timestamp);
    }

    return(
        <div className="weekSelector">
            <button onClick={pastWeek} className="weekSelectors"><span className="material-symbols-outlined">chevron_left</span></button>
            <p>{ sunday.toDateString() }</p>
            <button onClick={futureWeek} className="weekSelectors"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
    )
}

export default WeekSelect;