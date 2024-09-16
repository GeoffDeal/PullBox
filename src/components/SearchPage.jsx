import { ComicList } from "../Contexts";
import SearchDisplay from "./SearchDisplay"
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage () {
    const { comics } = useContext(ComicList);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const pageChange = (pageNumber) => {
        const page = searchParams.get('page');
        if (Number(page) !== pageNumber) {
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('page', pageNumber);
            return updatedParams;
        });
        }
    }

    const query = searchParams.get('query') || '';

    const searchBooks = (book) => query.length > 2 && book.ProductName.toLocaleLowerCase().includes(query);
    const searchedBooks = comics.filter(searchBooks);

    return (
        <div className="pageDisplay">
            <h1>Find Comics:</h1>
            <input 
                type="text" 
                value={searchParams.get('query') || undefined}
                placeholder="Search..."
                className="searchBar"
                onChange={((e) => {
                    setSearchParams(prev => {
                        const updatedParams = new URLSearchParams(prev);
                        updatedParams.set('query', e.target.value.toLocaleLowerCase());
                        return updatedParams;
                    });

                })}
            />
            {query.length > 2 && <SearchDisplay query={ searchedBooks } defaultPage={searchParams.get('page')} onPageChange={pageChange} />}
        </div>
    )
};

export default SearchPage