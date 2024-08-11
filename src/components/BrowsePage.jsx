import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import WeekSelect from "./WeekSelect";
import { ComicList } from "../Contexts";
import { calcWeek } from "./ComicDisplay";


const BrowsePage = () => {
    const [ filter, setFilter] = useState('release');
    const [ query, setQuery ] = useState('');
    const { comics } = useContext(ComicList);
    const [ publisher, setPublisher ] = useState('Marvel');
    const [ product, setProduct ] = useState('Comic');
    
    const queryChange = (date) => {
        setQuery(date)
    }
    const filterChange = (event) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
    }
    const publisherChange = (event) => {
        const pubValue = event.target.value;
        setPublisher(pubValue);
    }
    const productChange = (event) => {
        const productValue = event.target.value;
        setProduct(productValue);
    }

    const releaseSearch = (book) => calcWeek(book.Release) === query;
    const focSearch = (book) => calcWeek(book.FOCDueDate) === query;
    const publisherSearch = (book) => book.Publisher === publisher;
    const productSearch = (book) => book.ProductType === product;
    const searchBooks = () => {
        switch(filter) {
            case 'release':
                return comics.filter(releaseSearch);
            case 'publisher':
                return comics.filter(publisherSearch);
            case 'foc':
                return comics.filter(focSearch);
            case 'producttype':
                return comics.filter(productSearch);
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
            <button onClick={()=>{console.log(publisher)}}>Push Me</button>
            <p>Browse by: </p>
            <select onChange={filterChange}>
                <option value='release'>Release Date</option>
                <option value='publisher'>Publisher</option>
                <option value='foc'>Final Order Date</option>
                <option value='producttype'>Product</option>
            </select>
            {filter === 'producttype' &&
                <select onChange={productChange}>
                    <option value={'Comic'}>Comics</option>
                    <option value={'Trade Paperback'}>Trade Paperbacks</option>
                    <option value={'Hardcover'}>Hardcovers</option>
                    <option value={'Omnibus'}>Omnibuses</option>
                    <option value={'Graphic Novel'}>Graphic Novels</option>
                    <option value={'Poster'}>Posters</option>
                </select>}
            {filter === 'publisher' && 
                <select onChange={publisherChange}>
                    <option value={'Marvel'}>Marvel</option>
                    <option value={'Dc'}>DC</option>
                    <option value={'Image'}>Image</option>
                    <option value={'Dark Horse'}> Dark Horse</option>
                    <option value={'Idw'}>IDW</option>
                    <option value={'Boom!'}>BOOM!</option>
                    <option value={'Dynamite'}>Dynamite</option>
                </select>}
            {(filter === 'release' || filter === 'foc') && 
                <WeekSelect onDataPass={queryChange} />}
            <SearchDisplay query={ searchedBooks } />
        </div>
    )
}

export default BrowsePage;