import { useEffect, useState } from "react";
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

export const removeIssueDoubles = (bookArray) => {
    const trimmedArray = [];

    bookArray.forEach((book) => {
        if (book.ProductType === 'Comic') {
            if (!(trimmedArray.some(pushedBook => pushedBook.IssueSku === book.IssueSku ))) {
                trimmedArray.push(book);
            } else{
                const copyIndex = trimmedArray.findIndex(pushedBook => pushedBook.IssueSku === book.IssueSku);
                if (book.Variant < trimmedArray[copyIndex].Variant) {
                    trimmedArray[copyIndex] = book;
                }
            }
        } else {
            trimmedArray.push(book);
        }
    })
    return trimmedArray;
}

function SearchDisplay (props) {
    const { query, defaultPage, onPageChange } = props;

    const bookList = query;
    const trimmedArray = removeIssueDoubles(bookList);

    const previousSearchPage = defaultPage ? Number(defaultPage) : null;
    const booksPerPage = 20;
    const [ currentPage, setCurrentPage ] = useState(defaultPage ? previousSearchPage : 1);
    const firstIndex = (currentPage - 1) * booksPerPage;
    const displayBooks = trimmedArray.slice(firstIndex, firstIndex + booksPerPage);

    const pages = [];
    for (let i = 1; i <= Math.ceil(trimmedArray.length/booksPerPage); i++) {
        pages.push(i);
    }
    const limitedPages = pages.filter(i => {
        return i > currentPage - 4 && i < currentPage + 4;
    })

    useEffect(() => {
        if (!onPageChange) return;

        onPageChange(currentPage);
    }, [onPageChange, currentPage])

    return (
        <div className="searchDisplay">
            <div className="gridDisplay">
                {trimmedArray.length > 0 ?     
                    (displayBooks.map((book, index) => 
                        <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={index} className={'bookNav'}>
                            <img src={book.ImageURL} alt="Comic Cover" />
                            <p className="bookTitle">{ handleTitle(book.ProductName) }</p>
                        </NavLink>))
                    : <p className="noComics">No Comics Found</p>}
            </div>
            <div>
                {pages.length !== 0 && <button className="pageButton" onClick={()=> {setCurrentPage(1)}}><span className="material-symbols-outlined">first_page</span></button>}
                {currentPage !== 1 && pages.length !== 0 && <button className="pageButton" onClick={() => {setCurrentPage(currentPage - 1)}}><span className="material-symbols-outlined">chevron_left</span></button>}
                {pages.length !== 0 && limitedPages.map((page) => {
                    return <button className={`pageButton ${page === currentPage ? 'current' : '' }`} key={ page } onClick={() => {setCurrentPage(page)}}>{ page }</button>
                })}
                {currentPage !== pages[pages.length - 1] && pages.length !== 0 && <button className="pageButton" onClick={() => {setCurrentPage(currentPage + 1)}}><span className="material-symbols-outlined">chevron_right</span></button>}
                {pages.length !== 0 && <button className="pageButton" onClick={()=> {setCurrentPage(pages[pages.length - 1])}}><span className="material-symbols-outlined">last_page</span></button>}
            </div>
        </div>
    )
}

export default SearchDisplay;