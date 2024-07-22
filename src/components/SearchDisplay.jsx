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


    return (
        <div className="searchDisplay">
            <div className="gridDisplay">
                {bookList.length > 0 ?     
                    (bookList.map((book) => 
                        <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}>
                            <img src={book.ImageURL} alt="Comic Cover" />
                            <p className="bookTitle">{ handleTitle(book.ProductName) }</p>
                        </NavLink>))
                    : <p className="noComics">No Comics Found</p>}
            </div>
        </div>
    )
}

export default SearchDisplay;