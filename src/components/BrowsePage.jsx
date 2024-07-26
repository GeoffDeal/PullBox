import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import WeekSelect from "./WeekSelect";
import { ComicList } from "../Contexts";
import { calcWeek } from "./ComicDisplay";


const BrowsePage = () => {
    const [ filter, setFilter] = useState('release');
    const [ query, setQuery ] = useState('');
    const { comics } = useContext(ComicList);
    
    const queryChange = (date) => {
        setQuery(date)
    }
    const filterChange = (event) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
    }
    const releaseSearch = (book) => calcWeek(book.Release) === query;
    const focSearch = (book) => calcWeek(book.FOCDueDate) === query;
    // const publisherSearch = (book) => book.publisher.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    const searchBooks = () => {
        switch(filter) {
            case 'release':
                return comics.filter(releaseSearch);
            // case 'publisher':
            //     return comics.filter(publisherSearch);
            case 'foc':
                return comics.filter(focSearch);
        }
    }
    const searchedBooks = searchBooks();
    useEffect(() => {
        const now = new Date();
        const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
        const timestamp = calcWeek(lastSunday);
        setQuery(timestamp);
    }, []);

    return(
        <div>
            <h1>Browse</h1>
            <p>Browse by: </p>
            <select onChange={filterChange}>
                <option value='release'>Release Date</option>
                <option value='publisher'>Publisher</option>
                <option value='foc'>Final Order Date</option>
            </select>
            <WeekSelect onDataPass={queryChange} />
            <SearchDisplay query={ searchedBooks } />
        </div>
    )
}

export default BrowsePage;