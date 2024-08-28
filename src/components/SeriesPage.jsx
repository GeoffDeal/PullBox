import { useContext, useState } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { SeriesContext, ComicList } from "../Contexts"
import { handleTitle } from "./SearchDisplay";

function SeriesPage() {
const location = useLocation();
const { series } = useContext(SeriesContext);
const { comics } = useContext( ComicList);

const seriesSku = location.state.sku;
const currentSeries = series.find(obj => obj.skus.includes(seriesSku));

const seriesBooks = comics.filter(comic => currentSeries.skus.includes(comic.SeriesSku));
seriesBooks.sort((a, b) => b.Issue - a.Issue);

    return (
        <div className="pageDisplay">
            <h1>{ currentSeries.name }</h1>
            <h3>{ currentSeries.publisher }</h3>
            <div className="gridDisplay">
                {seriesBooks.map((book) => 
                    <NavLink to="/bookpage" state={{ itemCode: book.ItemCode }} key={book.ItemCode}>
                        <img src={book.ImageURL} alt="Comic Cover" />
                        <p className="bookTitle">{ handleTitle(book.ProductName) }</p>
                    </NavLink>)}
            </div>
        </div>
    )
}

export default SeriesPage;