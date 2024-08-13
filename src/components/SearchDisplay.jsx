import { useState } from "react";
import { NavLink } from "react-router-dom";

export function handleTitle(name) {
    const hastagIndex = name.indexOf('#');
    let cutIndex = -1 ;
    if (hastagIndex !== -1) {
        cutIndex = name.indexOf(" ", hastagIndex);
    }
    const trimmedName = cutIndex === -1 ? name : name.slice(0, cutIndex);
    const words = trimmedName.toLowerCase().split(" ");
    const newStr = words.map(word => {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    }).join(" ");
    return newStr.replace(/\bDm\b/g, 'DM').replace(/\bHc\b/g, 'HC').replace(/\bTp\b/g, 'TP');
}

function SearchDisplay (props) {
    const bookList = props.query;

    const [ currentPage, setCurrentPage ] = useState(1);
    const firstIndex = (currentPage - 1) * 12;
    const displayBooks = bookList.slice(firstIndex, firstIndex + 12);

    const pages = [];
    for (let i = 1; i <= Math.ceil(bookList.length/12); i++) {
        pages.push(i);
    }

    return (
        <div className="searchDisplay">
            <div className="gridDisplay">
                {bookList.length > 0 ?     
                    (displayBooks.map((book) => 
                        <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}>
                            <img src={book.ImageURL} alt="Comic Cover" />
                            <p className="bookTitle">{ handleTitle(book.ProductName) }</p>
                        </NavLink>))
                    : <p className="noComics">No Comics Found</p>}
            </div>
            <div>
                {currentPage !== 1 && <button className="pageButton" onClick={() => {setCurrentPage(currentPage - 1)}}><span className="material-symbols-outlined">chevron_left</span></button>}
                {pages.length !== 0 && pages.map((page) => {
                    return <button className={`pageButton ${page === currentPage ? 'current' : '' }`} key={ page } onClick={() => {setCurrentPage(page)}}>{ page }</button>
                })}
                {currentPage !== pages[pages.length - 1] && pages.length !== 0 && <button className="pageButton" onClick={() => {setCurrentPage(currentPage + 1)}}><span className="material-symbols-outlined">chevron_right</span></button>}
            </div>
        </div>
    )
}

export default SearchDisplay;