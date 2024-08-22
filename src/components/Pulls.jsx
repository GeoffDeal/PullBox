import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import WeekSelect from "./WeekSelect";
import { calcWeek } from "./ComicDisplay";

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
    useEffect(() => {
        const now = new Date();
        const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
        const timestamp = calcWeek(lastSunday);
        setSunday(timestamp);
    }, []);
    

    return (
        <div className="pageDisplay">
            <h1>Pulls and Subs</h1>
            <h3>Your pulls for the week of</h3>
            <WeekSelect onDataPass={setSunday} />

            <ComicsDisplay date={ sunday }/>
            <h3>Your subscription list:</h3>
            <ul className="bookSubs">
                {user.subList.map((series) => 
                    <li key={series}>
                        <div className="subItem">
                            {series}
                            <button className="removeSeries" onClick={() => removeButton(series)}><span className="material-symbols-outlined">remove</span></button>
                        </div>
                    </li>)}
            </ul>
            
        </div>
    )

}

export default Pulls;