import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import WeekSelect from "./WeekSelect";
import { ComicList } from "../Contexts";
import { calcWeek } from "./ComicDisplay";
import { useSearchParams } from "react-router-dom";


const BrowsePage = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { comics } = useContext(ComicList);

    

    const queryChange = (date) => {
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('timestamp', date);
            return updatedParams;
        });
    }
    const timeframeChange = (event) => {
        const timeframe = event.target.value;
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('timeframe', timeframe);
            return updatedParams;
        });
    }
    const publisherChange = (event) => {
        const pubValue = event.target.value;
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('publisher', pubValue);
            return updatedParams;
        });
    }
    const productChange = (event) => {
        const productValue = event.target.value;
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('product', productValue);
            return updatedParams;
        });
    }

    useEffect(() => {
        
        const now = new Date();
        const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
        const timestamp = calcWeek(lastSunday);

        const defaultParams = new URLSearchParams({
            timeframe: searchParams.get('timeframe') || 'release',
            timestamp: searchParams.get('timestamp') || timestamp,
            product: searchParams.get('product') || 'Comic',
            publisher: searchParams.get('publisher') || 'All',
        });
        setSearchParams(defaultParams);
    }, []);

    const searchBooks = () => {
        const timestampNumber = Number(searchParams.get('timestamp'));
        return comics.filter(product => 
            (searchParams.get('publisher') === 'All' || product.Publisher === searchParams.get('publisher')) &&
            (searchParams.get('product') === 'All' || product.ProductType === searchParams.get('product')) &&
            (searchParams.get('timeframe') !== 'release' || calcWeek(product.Release) === timestampNumber) &&
            (searchParams.get('timeframe') !== 'foc' || calcWeek(product.FOCDueDate) === timestampNumber)
        );
    }

    const searchedBooks = searchBooks();

    return(
        <div className="pageDisplay">
            <h1>Browse</h1>
            <p>Browse by: </p>
            <select onChange={timeframeChange}>
                <option value='release'>Release Date</option>
                <option value='foc'>Final Order Date</option>
                <option value='none'>None</option>
            </select>
            
            <select onChange={productChange}>
                <option value={'Comic'}>Comics</option>
                <option value={'Trade Paperback'}>Trade Paperbacks</option>
                <option value={'Hardcover'}>Hardcovers</option>
                {/* <option value={'Omnibus'}>Omnibuses</option> */}
                <option value={'Graphic Novel'}>Graphic Novels</option>
                <option value={'Poster'}>Posters</option>
                <option value={'All'}>All</option>
            </select>
            <select onChange={publisherChange}>
                <option value={'All'}>All</option>
                <option value={'Marvel'}>Marvel</option>
                <option value={'Dc'}>DC</option>
                <option value={'Image'}>Image</option>
                <option value={'Dark Horse'}> Dark Horse</option>
                <option value={'Idw'}>IDW</option>
                <option value={'Boom!'}>BOOM!</option>
                <option value={'Dynamite'}>Dynamite</option>
            </select>
            {searchParams.get('timeframe') !== 'none' && <WeekSelect onDataPass={queryChange} />}
            <SearchDisplay query={ searchedBooks } />
            <button onClick={() => console.log(searchParams)}>Push Me</button>
        </div>
    )
}

export default BrowsePage;