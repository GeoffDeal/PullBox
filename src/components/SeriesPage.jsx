import { useContext, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { SeriesContext, ComicList, UserContext } from "../Contexts";
import { handleTitle, removeIssueDoubles } from "./SearchDisplay";
import { toast } from "react-toastify";
import api from "../api/api";

function SeriesPage() {
  const location = useLocation();
  //   const { series } = useContext(SeriesContext);
  //   const { comics } = useContext(ComicList);
  const { user, setUser } = useContext(UserContext);

  // const seriesSku = location.state.sku;
  // const currentSeries = series.find(obj => obj.skus.includes(seriesSku));
  const seriesId = location.state.seriesId;
  const [currentSeries, setCurrentSeries] = useState();
  const [seriesBooks, setSeriesBooks] = useState();
  useEffect(() => {
    let cancelled = false;

    async function getSeries() {
      try {
        const seriesRes = await api.get(`/products/getseries/${seriesId}`);
        const booksRes = await api.get(`/products/getseriesbooks/${seriesId}`);
        if (!cancelled) {
          setCurrentSeries(seriesRes.data);
          setSeriesBooks(booksRes.data);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching series: ${err}`);
      }
    }
    getSeries();
    return () => {
      cancelled = true;
    };
  }, [seriesId]);

  let trimmedSeriesBooks = null;
  let isSubbed = null;
  //   if (currentSeries) {
  //     seriesBooks = comics.filter((comic) =>
  //       currentSeries.skus.includes(comic.SeriesSku)
  //     );
  //     trimmedSeriesBooks = removeIssueDoubles(seriesBooks);
  //     trimmedSeriesBooks.sort((a, b) => b.Issue - a.Issue);

  //     isSubbed = user.subList.some(
  //       (sub) => JSON.stringify(sub) === JSON.stringify(currentSeries)
  //     );
  //   }

  const removeSub = (series) => {
    const confirmBox = window.confirm(
      "Are you sure you wish to remove this subscription and associated pulls?"
    );

    if (confirmBox === true) {
      const updatedSubs = user.subList.filter(
        (sub) => JSON.stringify(sub) !== JSON.stringify(series)
      );
      setUser((user) => ({
        ...user,
        subList: updatedSubs,
      }));
    }
  };
  const addSub = (series) => {
    setUser((user) => ({
      ...user,
      subList: [...user.subList, series],
    }));
  };

  return (
    <div className="pageDisplay seriesPage">
      {currentSeries ? (
        <div>
          <h1>{currentSeries.name}</h1>
          <h3>{currentSeries.publisher}</h3>
          {isSubbed ? (
            <button
              className="goldButton"
              onClick={() => {
                removeSub(currentSeries);
              }}
            >
              Unsubscribe
            </button>
          ) : (
            <button
              className="goldButton"
              onClick={() => {
                addSub(currentSeries);
              }}
            >
              Subscribe
            </button>
          )}
          <div className="gridDisplay">
            {seriesBooks.map((book) => (
              <NavLink
                className="bookNav"
                to="/bookpage"
                state={{ itemCode: book.ItemCode }}
                key={book.ItemCode}
              >
                <img src={book.ImageURL} alt="Comic Cover" />
                <p className="bookTitle">{handleTitle(book.ProductName)}</p>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <h3>Series not found</h3>
      )}
    </div>
  );
}

export default SeriesPage;
