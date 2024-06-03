import { UserContext } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import { useContext, useState } from "react";

function Home () {
    const user = useContext(UserContext);

    return (
        <>
            <h1>Welcome {user.username}</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay />
            <h3>Upcoming FOCs. Last chance!</h3>
            <ul>
                {user.subList.map((series) => <li>{series}</li>)}
            </ul>
        </>
    )
};

export default Home;