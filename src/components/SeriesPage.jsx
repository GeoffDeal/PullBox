import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { handleTitle } from "../utils/utilityFunctions.js";
import { toast } from "react-toastify";
import { confirmToast } from "../utils/toasts.jsx";
import api from "../api/api";
import { useUser } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

function SeriesPage() {
  const location = useLocation();
  const seriesId = location.state.seriesId;
  const { user } = useUser();
  const getHeaders = useAuthHeader();
  const [currentSeries, setCurrentSeries] = useState();
  const [seriesBooks, setSeriesBooks] = useState();
  const [isSubbed, setIsSubbed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function getSeries() {
      try {
        const headers = await getHeaders();
        const seriesRes = await api.get(`/products/getseries/${seriesId}`, {
          headers,
        });
        const booksRes = await api.get(`/products/getseriesbooks/${seriesId}`, {
          headers,
        });

        const subRes = await api.get(`/subs/checksub`, {
          params: {
            userId: user.id,
            seriesId: seriesId,
          },
          headers,
        });
        if (!cancelled) {
          setCurrentSeries(seriesRes.data);
          setSeriesBooks(booksRes.data);
          setIsSubbed(subRes.data[0]?.id || false);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching series: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    getSeries();
    return () => {
      cancelled = true;
    };
  }, [seriesId, user.id, getHeaders]);

  const removeSub = async () => {
    async function deleteSub() {
      const subState = isSubbed;
      setIsSubbed(false);
      try {
        const headers = await getHeaders();
        await api.delete(`/subs/removesub/${isSubbed}`, { headers });
      } catch (err) {
        console.error(err);
        toast.error("Problem removing subscription, try again");
        setIsSubbed(subState);
      }
    }
    confirmToast(
      deleteSub,
      "Are you sure you wish to remove this subsciption and associated pulls?"
    );
  };

  const addSub = async () => {
    setIsSubbed(true);
    try {
      const headers = await getHeaders();
      const res = await api.post(
        "/subs/addsub",
        {
          userId: user.id,
          seriesId: seriesId,
        },
        { headers }
      );

      setIsSubbed(res.data[0].id);
    } catch (err) {
      console.error(err);
      toast.error("Problem adding subscription, try again");
      setIsSubbed(false);
    }
  };

  if (loading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

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
                to={`/bookpage/${book.ID}`}
                // state={{ productId: book.ID }}
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
