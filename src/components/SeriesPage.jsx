import { useContext, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { UserContext } from "../Contexts";
import { handleTitle } from "./SearchDisplay";
import { toast } from "react-toastify";
import api from "../api/api";

function SeriesPage() {
  const location = useLocation();
  const seriesId = location.state.seriesId;
  const { user, setUser } = useContext(UserContext);

  const [currentSeries, setCurrentSeries] = useState();
  const [seriesBooks, setSeriesBooks] = useState();
  const [isSubbed, setIsSubbed] = useState(false);
  useEffect(() => {
    let cancelled = false;

    async function getSeries() {
      try {
        const seriesRes = await api.get(`/products/getseries/${seriesId}`);
        const booksRes = await api.get(`/products/getseriesbooks/${seriesId}`);

        const subRes = await api.get(`/subs/checksub`, {
          params: {
            userId: user.id,
            seriesId: seriesId,
          },
        });
        if (!cancelled) {
          setCurrentSeries(seriesRes.data);
          setSeriesBooks(booksRes.data);
          setIsSubbed(subRes.data[0].id || false);
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
  }, [seriesId, user.id]);

  const removeSub = () => {
    const confirmBox = window.confirm(
      "Are you sure you wish to remove this subscription and associated pulls?"
    );

    async function deleteSub() {
      const subState = isSubbed;
      setIsSubbed(false);
      try {
        await api.delete(`/subs/removesub/${isSubbed}`);
      } catch (err) {
        console.error(err);
        toast.error("Problem removing subscription, try again");
        setIsSubbed(subState);
      }
    }
    if (confirmBox === true) {
      deleteSub();
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
      <button onClick={() => console.log(isSubbed)}>Push Me</button>
    </div>
  );
}

export default SeriesPage;
