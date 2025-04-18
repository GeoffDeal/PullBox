import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { findSundays, handleTitle } from "../utils/utilityFunctions.js";

function SearchDisplay(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookList, setBookList] = useState();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [maxPages, setMaxPages] = useState(1);
  const itemsPerPage = 20;
  const lastSunday = useMemo(() => findSundays().lastSunday, []);
  const skipFetch = useRef(false);

  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }
    let cancelled = false;
    async function getFoc() {
      try {
        let res;
        if (searchParams.has("query")) {
          const params = {
            term: searchParams.get("query"),
            limit: itemsPerPage,
            page: currentPage,
          };
          res = await api.get("/products/search", { params: params });
        } else {
          const params = {
            week: props.timeframe || searchParams.get("timeframe") || "release",
            date: props.date || searchParams.get("date") || lastSunday,
            product: props.product || searchParams.get("product") || "Comic",
            publisher:
              props.publisher || searchParams.get("publisher") || "All",
            page: currentPage,
            limit: itemsPerPage,
          };
          res = await api.get("/products/browse", {
            params: params,
          });
        }
        if (!cancelled) {
          setBookList(res.data.data);
          setMaxPages(res.data.meta.maxPages);
          const returnedPage = res.data.meta.currentPage;
          if (returnedPage !== currentPage) {
            skipFetch.current = true;
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", returnedPage);
            setSearchParams(newParams);
            setCurrentPage(returnedPage);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching products: ${err}`);
      }
    }
    getFoc();
    return () => {
      cancelled = true;
    };
  }, [
    props.date,
    props.timeframe,
    props.product,
    props.publisher,
    currentPage,
    searchParams,
    lastSunday,
    setSearchParams,
  ]);

  const pages = [];
  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);
  }
  const limitedPages = pages.filter((i) => {
    return i > currentPage - 4 && i < currentPage + 4;
  });

  const pageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
    setCurrentPage(page);
  };

  return (
    <div className="searchDisplay">
      <div className="gridDisplay">
        {bookList ? (
          bookList.map((book, index) => (
            <NavLink
              to="/bookpage"
              state={{ productId: book.ID }}
              key={index}
              className={"bookNav"}
            >
              <img src={book.ImageURL} alt="Comic Cover" />
              <p className="bookTitle">{handleTitle(book.ProductName)}</p>
            </NavLink>
          ))
        ) : (
          <p className="noComics">No Comics Found</p>
        )}
      </div>
      <div>
        {pages.length !== 0 && (
          <button
            className="pageButton"
            onClick={() => {
              pageChange(1);
            }}
          >
            <span className="material-symbols-outlined">first_page</span>
          </button>
        )}
        {currentPage !== 1 && pages.length !== 0 && (
          <button
            className="pageButton"
            onClick={() => {
              pageChange(currentPage - 1);
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        )}
        {pages.length !== 0 &&
          limitedPages.map((page) => {
            return (
              <button
                className={`pageButton ${
                  page === currentPage ? "current" : ""
                }`}
                key={page}
                onClick={() => {
                  pageChange(page);
                }}
              >
                {page}
              </button>
            );
          })}
        {currentPage !== pages[pages.length - 1] && pages.length !== 0 && (
          <button
            className="pageButton"
            onClick={() => {
              pageChange(currentPage + 1);
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        )}
        {pages.length !== 0 && (
          <button
            className="pageButton"
            onClick={() => {
              pageChange(pages[pages.length - 1]);
            }}
          >
            <span className="material-symbols-outlined">last_page</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchDisplay;
