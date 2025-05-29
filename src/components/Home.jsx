import { PriceAdjustments } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import { toast } from "react-toastify";
import api from "../api/api.js";
import { findSundays } from "../utils/utilityFunctions.js";
import { useUser } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

function Home() {
  const { user } = useUser();
  const getHeaders = useAuthHeader();
  const role = user?.publicMetadata?.role;
  const { lastSunday, nextSunday } = findSundays();

  // Week's total for shop

  const { priceAdjustments } = useContext(PriceAdjustments);
  const [weeksBooks, setWeeksBooks] = useState([]);
  const [expectedIncome, setExpectedIncome] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getWeeksBooks() {
      try {
        setLoading(true);
        const headers = await getHeaders();
        const res = await api.get("/pulls/getweekspulls", {
          params: { release: lastSunday },
          headers,
        });
        if (!cancelled) {
          const bookList = res.data;
          setWeeksBooks(bookList || []);
          let priceTotal = 0;
          if (bookList && bookList.length > 0 && priceAdjustments?.conversion) {
            bookList.forEach((book) => {
              const cadPrice =
                parseFloat(book.MSRP.replace("$", "")) *
                priceAdjustments.conversion;
              priceTotal += cadPrice;
            });
          }
          const totalRounded = priceTotal.toFixed(2);
          setExpectedIncome(totalRounded);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Error fetching pulls: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    if (role === "admin") getWeeksBooks();
    return () => {
      cancelled = true;
    };
  }, [lastSunday, priceAdjustments, role, getHeaders]);

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
    <div className="pageDisplay">
      <h1>Welcome</h1>
      {role === "admin" ? (
        <div>
          <h3>Your customers pulls for this week:</h3>
          <p>Total books pulled: {weeksBooks.length}</p>
          <p>Expected income from pulls: ${expectedIncome}</p>
        </div>
      ) : (
        <div>
          <h3>Your pulls for this week:</h3>
          <ComicsDisplay date={lastSunday} />
        </div>
      )}
      <h3>Upcoming FOCs. Last chance!</h3>
      <SearchDisplay timeframe={"foc"} date={nextSunday} />
    </div>
  );
}

export default Home;
