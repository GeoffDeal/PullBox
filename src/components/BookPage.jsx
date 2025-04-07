import { UserContext, ConversionRate } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { handleTitle } from "../utils/utilityFunctions.js";
import { calcWeek } from "./ComicDisplay";
import { toast } from "react-toastify";
import api from "../api/api";

function BookPage() {
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState();
  const { conversion } = useContext(ConversionRate);

  const location = useLocation();
  const productId = location.state.productId;
  const [book, setBook] = useState();
  const [pull, setPull] = useState(false);
  const [variantList, setVariantList] = useState();

  useEffect(() => {
    let cancelled = false;

    async function getBook() {
      try {
        const bookRes = await api.get(`/products/getproduct/${productId}`);
        const bookData = bookRes.data;

        const pullRes = await api.get(`/pulls/checkpull`, {
          params: {
            userId: user.id,
            productId: productId,
          },
        });

        let varRes = null;
        if (bookData.SeriesID && bookData.Issue && bookData.Variant) {
          varRes = await api.get("/products/getvariants", {
            params: {
              seriesId: bookData.SeriesID,
              issue: bookData.Issue,
              variant: bookData.Variant,
            },
          });
        }
        if (!cancelled) {
          setBook(bookData);
          setPull(pullRes.data[0] || false);
          setVariantList(varRes?.data || null);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching data: ${err}`);
      }
    }

    getBook();
    return () => {
      cancelled = true;
    };
  }, [productId, user.id]);

  let cadRounded = null;
  let formattedRelease = null;
  let formattedFoc = null;
  let afterFoc = null;
  let currentDate = null;

  if (book) {
    const cadPrice = parseFloat(book.MSRP.replace("$", "")) * conversion;
    cadRounded = cadPrice.toFixed(2);

    currentDate = new Date();
    const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
    const release = new Date(book.Release);
    const foc = new Date(book.FOCDueDate);
    formattedRelease = release.toLocaleDateString("en-GB", dateOptions);
    formattedFoc = foc.toLocaleDateString("en-GB", dateOptions);
    afterFoc =
      calcWeek(book.FOCDueDate) <= calcWeek(currentDate) ? true : false;
  }

  useEffect(() => {
    if (book) {
      setQuantity(pull.amount || 1);
    }
  }, [book, pull]);

  const pullBook = async () => {
    let cancelled = false;
    try {
      const res = await api.post("/pulls/addpull", {
        userId: user.id,
        productId: productId,
      });
      if (!cancelled) {
        setPull(res.data[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Problem adding pull, try again");
    }
  };
  const removePull = async () => {
    const pullId = pull.id;
    try {
      await api.delete(`/pulls/removepull/${pullId}`);

      setPull(false);
    } catch (err) {
      console.error(err);
    }
  };
  const pullQuantity = async (e) => {
    const prevQuantity = quantity;
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);

    try {
      await api.patch(`/pulls/changepullamount/${pull.id}`, {
        amount: newQuantity,
      });
    } catch (err) {
      console.error(err);
      setQuantity(prevQuantity);
    }
  };

  return (
    <div className="bookPage pageDisplay">
      {book ? (
        <div>
          <h1>{handleTitle(book.ProductName)}</h1>
          <div className="bookInfo">
            <img className="bookImage" src={book.ImageURL} alt="Comic cover" />
            <div className="bookTextBlock">
              <p>Publisher: {book.Publisher}</p>
              <p>{book.ProductType}</p>
              <p>
                Price: {book.MSRP}USD / ${cadRounded}CAD
              </p>
              <p>Release Date: {formattedRelease}</p>
              <p>Final order cutoff: {formattedFoc}</p>
              {(book.ProductType === "Comic" ||
                book.ProductType === "Incentive") && (
                <NavLink
                  className="purpleNav"
                  to="/seriespage"
                  state={{ seriesId: book.SeriesID }}
                >
                  View Series
                </NavLink>
              )}
              {calcWeek(book.Release) > calcWeek(currentDate) && (
                <div>
                  <div className="pullDiv">
                    {!pull && (
                      <button
                        className={`pullButton ${
                          afterFoc ? "afterFoc" : "beforeFoc"
                        }`}
                        onClick={pullBook}
                      >
                        Pull
                      </button>
                    )}
                    {pull && (
                      <div>
                        <p>Pulled!</p>
                        <label>Number of copies:</label>
                        <input
                          type="number"
                          onChange={pullQuantity}
                          value={quantity}
                        />
                      </div>
                    )}
                  </div>
                  {pull && (
                    <button
                      className="pullButton beforeFoc"
                      onClick={removePull}
                    >
                      Remove
                    </button>
                  )}
                  {afterFoc && (
                    <p>
                      It is after the final order cutoff, you will receive this
                      book based on availablity
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="variantDisplay">
            {variantList && <h3>Variant Covers:</h3>}
            <div className="gridDisplay">
              {variantList &&
                variantList.map((book) => (
                  <NavLink
                    to="/bookpage"
                    state={{ productId: book.ID }}
                    key={book.ItemCode}
                    className={"bookNav"}
                  >
                    <img src={book.ImageURL} alt="Comic Cover" />
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <h3>Book not found</h3>
      )}
    </div>
  );
}

export default BookPage;
