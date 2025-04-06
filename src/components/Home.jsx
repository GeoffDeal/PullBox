import { UserContext, ConversionRate } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import { toast } from "react-toastify";
import api from "../api/api.js";
import { findSundays } from "../utils/utilityFunctions.js";

function Home() {
  const { user } = useContext(UserContext);
  const { lastSunday, nextSunday } = findSundays();

  // Week's total for shop

  const { conversion } = useContext(ConversionRate);
  const [weeksBooks, setWeeksBooks] = useState([]);
  const [expectedIncome, setExpectedIncome] = useState();

  useEffect(() => {
    let cancelled = false;

    async function getWeeksBooks() {
      try {
        const res = await api.get("/pulls/getweekspulls", {
          params: { release: lastSunday },
        });
        if (!cancelled) {
          const bookList = res.data;
          setWeeksBooks(bookList || []);
          let priceTotal = 0;
          if (bookList && bookList.length > 0) {
            bookList.forEach((book) => {
              const cadPrice =
                parseFloat(book.MSRP.replace("$", "")) * conversion;
              priceTotal += cadPrice;
            });
          }
          const totalRounded = priceTotal.toFixed(2);
          setExpectedIncome(totalRounded);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Error fetching pulls: ${err}`);
      }
    }
    getWeeksBooks();
    return () => {
      cancelled = true;
    };
  }, [lastSunday, conversion]);

  return (
    <div className="pageDisplay">
      <h1>Welcome {user.name}</h1>
      {user.customer ? (
        <div>
          <h3>Your pulls for this week:</h3>
          <ComicsDisplay date={lastSunday} />
        </div>
      ) : (
        <div>
          <h3>Your customers pulls for this week:</h3>
          <p>Total books pulled: {weeksBooks.length}</p>
          <p>Expected income from pulls: ${expectedIncome}</p>
        </div>
      )}
      <h3>Upcoming FOCs. Last chance!</h3>
      <SearchDisplay timeframe={"foc"} date={nextSunday} />
    </div>
  );
}

export default Home;
