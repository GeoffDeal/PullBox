import { ComicList } from "../Contexts";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";


function BookPage() {
    const { comics } = useContext(ComicList);
    const location = useLocation();
    const itemCode = location.state.itemCode;
    const book = comics.find(comic => comic.ItemCode === itemCode);

    return (
        <div className="bookPage">
            <h1>{ book.ProductName }</h1>
            <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
            <p>Price: { book.MSRP }</p>
            <p>Release Date: { book.Release }</p>
            <p>Final order cutoff: { book.FOCDueDate }</p>
            <div className="pullDiv">
                <button className="pullButton">Pull</button>
                <label>Number of copies:</label>
                <input type="number" />
            </div>
        </div>
    )
}

export default BookPage;