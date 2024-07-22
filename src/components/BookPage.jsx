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
    const dateOptions = {day: '2-digit', month: 'short', year: 'numeric'};
    const release = new Date(book.Release);
    const foc = new Date(book.FOCDueDate);
    const formattedRelease = release.toLocaleDateString('en-GB', dateOptions);
    const formattedFoc = foc.toLocaleDateString('en-GB', dateOptions);
    const afterFoc  = calcWeek(book.FOCDueDate) < calcWeek(currentDate) ? true : false;

    return (
        <div className="bookPage">
            <h1>{ handleTitle(book.ProductName) }</h1>
            <div className="bookInfo">
                <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
                <div className="bookTextBlock">
                    <p>Price: { book.MSRP }</p>
                    <p>Release Date: { formattedRelease }</p>
                    <p>Final order cutoff: { formattedFoc }</p>
                    {calcWeek(book.Release) > calcWeek(currentDate) && 
                        <div>
                            <div className="pullDiv">
                                <button className={ `pullButton ${afterFoc ? 'afterFoc' : 'beforeFoc' }`}>Pull</button>
                                <label>Number of copies:</label>
                                <input type="number" />
                            </div>
                            {afterFoc && <p>It is after the final order cutoff, you will receive this book based on availablity</p>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookPage;