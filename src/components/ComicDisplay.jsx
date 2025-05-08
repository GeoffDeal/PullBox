import { useContext, useEffect, useState } from "react";
import { PriceAdjustments } from "../Contexts";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { useUser } from "@clerk/clerk-react";

function ComicsDisplay(props) {
  const { user } = useUser();
  const { priceAdjustments } = useContext(PriceAdjustments);
  const [weeksPulls, setWeeksPulls] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function getPulls() {
      try {
        const res = await api.get("/pulls/getuserpulls", {
          params: {
            userId: user.id,
            release: props.date,
          },
        });
        if (!cancelled) {
          setWeeksPulls(res.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Error fetching pulls: ${err}`);
      }
    }
    getPulls();
    return () => {
      cancelled = true;
    };
  }, [user.id, props.date]);

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

  return (
    <div className="bookDisplay">
      <div className="imageContainer">
        {weeksPulls.map((book) => (
          <NavLink to="/bookpage" state={{ productId: book.ID }} key={book.ID}>
            <img src={book.ImageURL} alt="Comic Cover" />
          </NavLink>
        ))}
      </div>
      <p>Your expected total this week: ${totalCost()}</p>
    </div>
  );
}

export default ComicsDisplay;
