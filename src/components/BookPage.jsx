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

    let variantList = null;
    let cadRounded = null;
    let formattedRelease = null;
    let formattedFoc = null;
    let afterFoc = null;
    let currentDate = null;

    if (book) {
        variantList = book.ProductType === 'Comic' ? 
            comics.filter(comic => comic.IssueSku === book.IssueSku && comic.Sku !== book.Sku) 
            : null;
    
        const cadPrice = parseFloat(book.MSRP.replace('$', '')) * conversion;
        cadRounded = cadPrice.toFixed(2);
    
        currentDate = new Date();
        const dateOptions = {day: '2-digit', month: 'short', year: 'numeric'};
        const release = new Date(book.Release);
        const foc = new Date(book.FOCDueDate);
        formattedRelease = release.toLocaleDateString('en-GB', dateOptions);
        formattedFoc = foc.toLocaleDateString('en-GB', dateOptions);
        afterFoc  = calcWeek(book.FOCDueDate) <= calcWeek(currentDate) ? true : false;
    }

    useEffect(() => {
        if (book) {
            setQuantity(book.Quantity || 1);
        }
    }, [book]);

    const pullBook = () => {
        const pullDate = new Date();
        const customerInfo = {
            boxNumber: user.boxNumber,
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
            {book ? <div>
                <h1>{ handleTitle(book.ProductName) }</h1>
                <div className="bookInfo">
                    <img className="bookImage" src={ book.ImageURL } alt="Comic cover" />
                    <div className="bookTextBlock">
                        <p>Publisher: { book.Publisher }</p>
                        <p>{ book.ProductType }</p>
                        <p>Price: { book.MSRP }USD / ${ cadRounded }CAD</p>
                        <p>Release Date: { formattedRelease }</p>
                        <p>Final order cutoff: { formattedFoc }</p>
                        {(book.ProductType === 'Comic' || book.ProductType === 'Incentive') && <NavLink className='purpleNav' to="/seriespage" state={{ sku: book.SeriesSku }}>View Series</NavLink>}
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
                <div className="variantDisplay">
                    <h3>Variant Covers:</h3>
                    <div className="gridDisplay">
                        {variantList && variantList.map((book) => 
                            <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode} className={'bookNav'}>
                                <img src={book.ImageURL} alt="Comic Cover" />
                            </NavLink>)}
                    </div>
                </div>
            </div> :
            <h3>Book not found</h3>}
        </div>
    )
}

export default BookPage;