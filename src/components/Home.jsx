import { UserContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import { useContext, useState } from "react";

function Home () {
    const { user } = useContext(UserContext);

    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

    return (
        <>
            <h1>Welcome {user.name}</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay date={ lastSunday.getTime()} />
            <h3>Upcoming FOCs. Last chance!</h3>

        </>
    )
};

export default Home;