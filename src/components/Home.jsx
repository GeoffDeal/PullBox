import { ComicList, UserContext } from "../Contexts";
import ComicsDisplay, { calcWeek } from "./ComicDisplay";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

function Home () {
    const { user } = useContext(UserContext);
    const { comics } = useContext(ComicList);

    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

    const focComics = comics.filter(book => calcWeek(book.FOCDueDate) === lastSunday.getTime());

    return (
        <>
            <h1>Welcome {user.name}</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay date={ lastSunday.getTime()} />
            <h3>Upcoming FOCs. Last chance!</h3>
            <div className="bookDisplay" id="focDisplay">
                <div className="imageContainer">
                    {focComics.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>)}
                </div>
            </div>
        </>
    )
};

export default Home;