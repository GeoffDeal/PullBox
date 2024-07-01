import { useContext } from "react"
import { ComicList } from "../Contexts";
import { NavLink } from "react-router-dom";

function SearchDisplay (props) {
    // const { comics } = useContext(ComicList);
    // const searchFilter = props.search;
    // const query = props.query;
    const bookList = props.query;

    return (
       
        <div className="searchDisplay">

            <div className="gridDisplay">
                {bookList.length > 0 ?     
                    (bookList.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>))
                    : <p>No Comics Found</p>}
            </div>
        </div>
    )
}

export default SearchDisplay;