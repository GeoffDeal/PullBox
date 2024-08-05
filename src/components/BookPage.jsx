import { ComicList, UserContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleTitle } from "./SearchDisplay";
import { calcWeek } from "./ComicDisplay";


function BookPage() {
    const { user, setUser } = useContext(UserContext);
    const { comics } = useContext(ComicList);
    const [ quantity, setQuantity ] = useState();

    const location = useLocation();
    const itemCode = location.state.itemCode;
    const book = comics.find(comic => comic.ItemCode === itemCode);

    const currentDate = new Date();
    const dateOptions = {day: '2-digit', month: 'short', year: 'numeric'};
    const release = new Date(book.Release);
    const foc = new Date(book.FOCDueDate);
    const formattedRelease = release.toLocaleDateString('en-GB', dateOptions);
    const formattedFoc = foc.toLocaleDateString('en-GB', dateOptions);
    const afterFoc  = calcWeek(book.FOCDueDate) <= calcWeek(currentDate) ? true : false;

    useEffect(() => {
        if (book) {
            setQuantity(book.Quantity || 1);
        }
    }, [book]);

    const pullBook = () => {
        setUser(prev => ({
            ...prev,
            pulls: [...prev.pulls, {...book, Quantity: quantity}]
        }));
    }
    const removePull = () => {
        const revisedPulls = user.pulls.filter(comic => comic.Sku !== book.Sku);  
        setUser(prev => ({
            ...prev,
            pulls: revisedPulls
        }))
    }
    const pullQuantity = (e) => {
        const newQuantity = Number(e.target.value)
        setQuantity(newQuantity);

        const updatedPulls = user.pulls.map(item => {
            return item.Sku === book.Sku ? 
                {...item, Quantity: newQuantity } 
                : item})
        setUser(prev => ({
            ...prev,
            pulls: updatedPulls 
        }))
    }

    return (
        <div className="bookPage">
            <h1>{ handleTitle(book.ProductName) }</h1>
            <div className="bookInfo">
                <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
                <div className="bookTextBlock">
                    <p>Publisher: { book.Publisher }</p>
                    <p>Price: { book.MSRP }</p>
                    <p>Release Date: { formattedRelease }</p>
                    <p>Final order cutoff: { formattedFoc }</p>
                    {calcWeek(book.Release) > calcWeek(currentDate) && 
                        <div>
                            <div className="pullDiv">
                                {!user.pulls.some(comic => comic.Sku === book.Sku) && <button className={ `pullButton ${afterFoc ? 'afterFoc' : 'beforeFoc' }`} onClick={pullBook}>Pull</button>}
                                {user.pulls.some(comic => comic.Sku === book.Sku) && 
                                    <div><p>Pulled!</p>
                                        <label>Number of copies:</label>
                                        <input type="number" onChange={pullQuantity} value={quantity}/>
                                    </div>}
                            </div>
                            {user.pulls.some(comic => comic.Sku === book.Sku) && <button className="pullButton beforeFoc" onClick={removePull}>Remove</button>}
                            {afterFoc && <p>It is after the final order cutoff, you will receive this book based on availablity</p>}
                        </div>
                    }
                    <button onClick={() => console.log(book)}>Push me</button>
                </div>
            </div>
        </div>
    )
}

export default BookPage;