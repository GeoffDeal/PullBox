import { useContext, useState } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { SeriesContext, ComicList, UserContext } from "../Contexts"
import { handleTitle } from "./SearchDisplay";

function SeriesPage() {
const location = useLocation();
const { series } = useContext(SeriesContext);
const { comics } = useContext( ComicList);
const { user, setUser } = useContext(UserContext);

const seriesSku = location.state.sku;
const currentSeries = series.find(obj => obj.skus.includes(seriesSku));

const seriesBooks = comics.filter(comic => currentSeries.skus.includes(comic.SeriesSku));
seriesBooks.sort((a, b) => b.Issue - a.Issue);

const isSubbed = user.subList.some( (sub) => JSON.stringify(sub) === JSON.stringify(currentSeries) );

const removeSub = (series) => {
    const confirmBox = window.confirm("Are you sure you wish to remove this subscription and associated pulls?")

    if (confirmBox === true) {
        const updatedSubs = user.subList.filter(sub => JSON.stringify(sub) !== JSON.stringify(series));
        setUser((user) => ({
            ...user,
            subList: updatedSubs,
        }));
    }
}
const addSub = (series) => {
    setUser(user => ({
        ...user,
        subList: [...user.subList, series]
    }))
}

    return (
        <div className="pageDisplay">
            <h1>{ currentSeries.name }</h1>
            <h3>{ currentSeries.publisher }</h3>
            {isSubbed ? 
                <button onClick={() => {removeSub(currentSeries)}}>Unsubscribe</button> : 
                <button onClick={() => {addSub(currentSeries)}}>Subscribe</button>
            }
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