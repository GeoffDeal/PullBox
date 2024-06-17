import { useContext, useState } from "react";
import { UserContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";

function Pulls () {
    const { user, setUser } = useContext(UserContext);

    const removeButton = (series) => {
        const confirmBox = window.confirm("Are you sure you wish to remove this subscription?")

        if (confirmBox === true) {
            const updatedSubs = user.subList.filter(sub => sub !== series);
            setUser((user) => ({
                ...user,
                subList: updatedSubs,
            }));
        }
    }

    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

    const [ sunday, setSunday ] = useState(lastSunday);
    const futureWeek = () => {
        const day = new Date (sunday);
        day.setDate(sunday.getDate() + 7);
        setSunday(day);
    }
    const pastWeek = () => {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() - 7);
        setSunday(day);
    }
    

    return (
        <>
            <h1>Pulls and Subs</h1>
            <h3>Your pulls for the week of</h3>
            <div className="weekSelection">
                <button onClick={pastWeek} className="weekSelectors"><span className="material-symbols-outlined">chevron_left</span></button>
                <p>{ sunday.toDateString() }</p>
                <button onClick={futureWeek} className="weekSelectors"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
            <ComicsDisplay date={ sunday.getTime() }/>
            <h3>Your subscription list:</h3>
            <ul id="bookSubs">
                {user.subList.map((series) => 
                    <li key={series}>
                        <div className="subItem">
                            {series}
                            <button className="removeSeries" onClick={() => removeButton(series)}><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </li>)}
            </ul>
            
        </>
    )

}

export default Pulls;