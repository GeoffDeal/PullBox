import { useState, useContext } from "react";
import { PullList } from "../Contexts";
import { NavLink } from "react-router-dom";


export function calcWeek (date) {
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() - dateObject.getDay())
    dateObject.setHours(0, 0, 0, 0);
    const dateTimestamp = dateObject.getTime();
    return dateTimestamp;
    }

function ComicsDisplay (props) {
    const { pulls, setPulls } = useContext(PullList);
    const targetWeek = props.date;

    const weeksPulls = pulls.filter(pull => calcWeek(pull.Release) === targetWeek);

    const totalCost = () => {
        const preTax = weeksPulls.reduce((sum, current) => sum + parseFloat(current.MSRP.replace('$', '')), 0 );
        return Math.round(preTax * 115) / 100;
    }

    return (
        <div className="bookDisplay">
            {/* <button className="scrollButton scrollLeft"><span className="material-symbols-outlined">chevron_left</span></button> */}
            <div className="imageContainer">
                {weeksPulls.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>)}
            </div>
            {/* <button className="scrollButton scrollRight"><span className="material-symbols-outlined">chevron_right</span></button> */}
            <p>Your expected total this week: ${totalCost()}</p>
        </div>
    )
}

export default ComicsDisplay;