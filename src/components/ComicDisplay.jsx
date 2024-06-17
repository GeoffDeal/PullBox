import { useState, useContext } from "react";
import { PullList } from "../Contexts";

export function calcWeek (date) {
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() - dateObject.getDay())
    dateObject.setHours(0, 0, 0, 0);
    const dateTimestamp = dateObject.getTime();
    console.log(dateTimestamp);
    return dateTimestamp;
    }

function ComicsDisplay (props) {
    const { pulls, setPulls } = useContext(PullList);
    const targetWeek = props.date;

    const weeksPulls = pulls.filter(pull => calcWeek(pull.release) === targetWeek);
    console.log(weeksPulls);

    const totalCost = () => {
        const preTax = weeksPulls.reduce((sum, current) => sum + current.cost, 0 );
        return Math.round(preTax * 115) / 100;
    }

    return (
        <div className="bookDisplay">
            <button className="scrollButton scrollLeft"><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="imageContainer">
                {weeksPulls.map((book) => <img src={book.image} key={book.id} alt="Comic Cover" />)}
            </div>
            <button className="scrollButton scrollRight"><span className="material-symbols-outlined">chevron_right</span></button>
            <p>Your expected total this week: ${totalCost()}</p>
        </div>
    )
}

export default ComicsDisplay;