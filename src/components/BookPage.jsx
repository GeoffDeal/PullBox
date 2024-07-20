import { ComicList } from "../Contexts";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleTitle } from "./SearchDisplay";
import { calcWeek } from "./ComicDisplay";


function BookPage() {
    const { comics } = useContext(ComicList);
    const location = useLocation();
    const itemCode = location.state.itemCode;
    const book = comics.find(comic => comic.ItemCode === itemCode);
    const currentDate = new Date();

    return (
        <div className="bookPage">
            <h1>{ handleTitle(book.ProductName) }</h1>
            <div className="bookInfo">
                <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
                <div className="bookTextBlock">
                    <p>Price: { book.MSRP }</p>
                    <p>Release Date: { book.Release }</p>
                    <p>Final order cutoff: { book.FOCDueDate }</p>
                    {calcWeek(book.Release) > calcWeek(currentDate) && 
                        <div className="pullDiv">
                            <button className="pullButton">Pull</button>
                            <label>Number of copies:</label>
                            <input type="number" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookPage;