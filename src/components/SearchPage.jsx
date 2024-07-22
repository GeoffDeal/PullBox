import { ComicList } from "../Contexts";
import SearchDisplay from "./SearchDisplay"
import { useContext, useState } from "react";

function SearchPage () {
    const [query, setQuery] = useState("");
    const { comics } = useContext(ComicList);
    const [display, setDisplay] = useState(false);

    const searchBooks = (book) => book.ProductName.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    const searchedBooks = comics.filter(searchBooks);

    return (
        <>
            <h1>Find Comics:</h1>
            <input 
                type="text" 
                placeholder="Search..."
                className="searchBar"
                onChange={((e) => {
                    if (e.target.value.length > 2) {
                        setDisplay(true);
                        setQuery(e.target.value);
                    }
                })}
            />
            {display && <SearchDisplay query={ searchedBooks } />}
        </>
    )
};

export default SearchPage