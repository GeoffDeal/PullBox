import { NavLink } from "react-router-dom";

export function handleTitle(name) {
    const cutIndex = name.indexOf(" ", name.indexOf("#"));
    const trimmedName = cutIndex === -1 ? name : name.slice(0, cutIndex);
    const words = trimmedName.toLowerCase().split(" ");
    return words.map(word => {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    }).join(" ");
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