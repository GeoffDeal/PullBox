import { useContext, useState } from "react"
import { ComicList } from "../Contexts";
import { NavLink } from "react-router-dom";

function SearchDisplay (props) {
    const { comics, setComics } = useContext(ComicList);
    const [query, setQuery] = useState("");
    const searchedBooks = comics.filter(book => book.ProductName.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    return (
       
        <div className="searchDisplay">
            <input 
                type="text" 
                placeholder="Search..."
                className="searchBar"
                onChange={((e) => setQuery(e.target.value))}
            />
            <div className="gridDisplay">
                {searchedBooks.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>)}
            </div>
        </div>
    )
}

export default SearchDisplay;