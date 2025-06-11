import { useContext, useEffect, useState } from "react";
import { PriceAdjustments } from "../Contexts";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter";

function ComicsDisplay(props) {
  const { user } = useUser();
  const { isLoaded } = useAuth();
  const { priceAdjustments } = useContext(PriceAdjustments);
  const [weeksPulls, setWeeksPulls] = useState([]);
  const getHeaders = useAuthHeader();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;

    async function getPulls() {
      try {
        const headers = await getHeaders();
        if (!headers) return;

        const res = await api.get("/pulls/getuserpulls", {
          params: {
            userId: user.id,
            release: props.date,
          },
          headers,
        });
        if (!cancelled) {
          setWeeksPulls(res.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Error fetching pulls: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    getPulls();
    return () => {
      cancelled = true;
    };
  }, [user.id, props.date, getHeaders, isLoaded]);

  const totalCost = () => {
    const productSorted = weeksPulls.reduce((acc, product) => {
      const productType = product.ProductType;
      if (!acc[productType]) {
        acc[productType] = [];
      }
      acc[productType].push(product);
      return acc;
    }, {});

    let total = 0;

    Object.keys(productSorted).forEach((type) => {
      let taxRate = 1;
      if (priceAdjustments.taxRates[type]) {
        taxRate = priceAdjustments.taxRates[type] * 0.01 + 1;
      }
      productSorted[type].forEach((book) => {
        total +=
          parseFloat(book.MSRP.replace("$", "")) *
          priceAdjustments.conversion *
          taxRate;
      });
    });
    return total.toFixed(2);
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
    <div className="bookDisplay">
      <div className="imageContainer">
        {weeksPulls.map((book) => (
          <NavLink
            to={`/bookpage/${book.ID}`}
            // state={{ productId: book.ID }}
            key={book.ID}
          >
            <img src={book.ImageURL} alt="Comic Cover" />
          </NavLink>
        ))}
      </div>
      <p>Your expected total this week: ${totalCost()}</p>
    </div>
  );
}

export default ComicsDisplay;
