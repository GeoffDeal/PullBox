import { ComicList, UserContext, ConversionRate } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { handleTitle } from "./SearchDisplay";
import { calcWeek } from "./ComicDisplay";


function BookPage() {
    const { user, setUser } = useContext(UserContext);
    const { comics } = useContext(ComicList);
    const [ quantity, setQuantity ] = useState();
    const { conversion } = useContext(ConversionRate);

    const location = useLocation();
    const itemCode = location.state.itemCode;
    const book = comics.find(comic => comic.ItemCode === itemCode);

    const cadPrice = parseFloat(book.MSRP.replace('$', '')) * conversion;
    const cadRounded = cadPrice.toFixed(2);

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
        const pullDate = new Date();
        const customerInfo = {
            name: user.name,
            pullDate: pullDate,
        }
        setUser(prev => ({
            ...prev,
            pulls: [...prev.pulls, {...book, "Qty.Ord.OnTime": quantity, Customer: customerInfo}]
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
        <div className="bookPage pageDisplay">
            <h1>{ handleTitle(book.ProductName) }</h1>
            <div className="bookInfo">
                <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
                <div className="bookTextBlock">
                    {book.ProductType === 'Comic' && <NavLink to="/seriespage" state={{ sku: book.SeriesSku }}>Series</NavLink>}
                    <p>Publisher: { book.Publisher }</p>
                    <p>{ book.ProductType }</p>
                    <p>Price: { book.MSRP }USD / ${ cadRounded }CAD</p>
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
                </div>
            </div>
            <button onClick={() => {console.log(book)}}>Push Me</button>
        </div>
    )
}

export default BookPage;