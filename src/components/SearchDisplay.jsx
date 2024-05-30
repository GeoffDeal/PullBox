import { useContext, useState } from "react"
import { ComicList } from "../Contexts";

function SearchDisplay (props) {
    const allBooks = useContext(ComicList);
    const [query, setQuery] = useState("");
    const searchedBooks = allBooks.filter(book => book.ProductName.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    console.log(query);
    return (
       
        <div className="searchDisplay">
            <input 
                type="text" 
                placeholder="Search..."
                className="searchBar"
                onChange={((e) => setQuery(e.target.value))}
            />
            <div className="gridDisplay">
                {searchedBooks.map((book) => <img src={book.ImageURL} key={book.ItemCode} alt="Comic Cover" />)}
            </div>
        </div>
    )
}

export default SearchDisplay;