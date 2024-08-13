import { ComicList, UserContext } from "../Contexts";
import ComicsDisplay, { calcWeek } from "./ComicDisplay";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchDisplay from "./SearchDisplay";

function Home () {
    const { user } = useContext(UserContext);
    const { comics } = useContext(ComicList);

    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    const nextSunday = new Date(lastSunday)
    nextSunday.setDate(lastSunday.getDate() + 7);

    const focComics = comics.filter(book => calcWeek(book.FOCDueDate) === calcWeek(nextSunday));

    return (
        <>
            <h1>Welcome {user.name}</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay date={ lastSunday.getTime()} />
            <h3>Upcoming FOCs. Last chance!</h3>
            <SearchDisplay query={ focComics }/>

        </>
    )
};

export default Home;