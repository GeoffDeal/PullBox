import { useContext } from "react";
import { UserContext } from "../Contexts";
import { NavLink } from "react-router-dom";


export function calcWeek (date) {
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() - dateObject.getDay())
    dateObject.setHours(0, 0, 0, 0);
    const dateTimestamp = dateObject.getTime();
    return dateTimestamp;
    }

function ComicsDisplay (props) {
    const { user } = useContext(UserContext);
    const targetWeek = props.date;

    const weeksPulls = user.pulls.filter(pull => calcWeek(pull.Release) === targetWeek);

    const totalCost = () => {
        const preTax = weeksPulls.reduce((sum, current) => sum + parseFloat(current.MSRP.replace('$', '')), 0 );
        return Math.round(preTax * 115) / 100;
    }

    return (
        <div className="bookDisplay">
            <div className="imageContainer">
                {weeksPulls.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>)}
            </div>
            <p>Your expected total this week: ${totalCost()}</p>
        </div>
    )
}

export default ComicsDisplay;