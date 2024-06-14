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

    return (
        <>
            <h1>Pulls and Subs</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay />
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