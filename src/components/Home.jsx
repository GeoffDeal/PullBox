import { UserContext, ConversionRate } from "../Contexts";
import ComicsDisplay from "./ComicDisplay";
import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import { toast } from "react-toastify";
import api from "../api/api.js";

function Home() {
  const { user } = useContext(UserContext);

  const now = new Date();
  const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
  const lastSundayFormatted = lastSunday.toLocaleDateString("en-CA");
  const nextSunday = new Date(lastSunday);
  nextSunday.setDate(lastSunday.getDate() + 7);
  const nextSundayFormatted = nextSunday.toLocaleDateString("en-CA");

  // Get foc comics
  const [focComics, setFocComics] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function getFoc() {
      try {
        const res = await api.get("/products/browse", {
          params: {
            week: "foc",
            date: nextSundayFormatted,
            limit: 20,
            page: currentPage,
          },
        });
        if (!cancelled) {
          setFocComics(res.data.data);
          setMaxPages(res.data.pages);
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
  }, [nextSundayFormatted, currentPage]);

  // Week's total for shop

  // const { customers } = useContext(CustomersContext);
  const { conversion } = useContext(ConversionRate);
  const [weeksBooks, setWeeksBooks] = useState([]);
  const [expectedIncome, setExpectedIncome] = useState();

  useEffect(() => {
    let cancelled = false;

    async function getWeeksBooks() {
      try {
        const res = await api.get("/pulls/getweekspulls", {
          params: { release: lastSundayFormatted },
        });
        if (!cancelled) {
          setWeeksBooks(res.data || []);
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
  }, [lastSundayFormatted]);

  useEffect(() => {
    let priceTotal = 0;
    weeksBooks.forEach((book) => {
      const cadPrice = parseFloat(book.MSRP.replace("$", "")) * conversion;
      priceTotal += cadPrice;
    });
    const totalRounded = priceTotal.toFixed(2);
    setExpectedIncome(totalRounded);
  }, [weeksBooks, conversion]);

  const pageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pageDisplay">
      <h1>Welcome {user.name}</h1>
      {user.customer ? (
        <div>
          <h3>Your pulls for this week:</h3>
          <ComicsDisplay date={lastSundayFormatted} />
        </div>
      ) : (
        <div>
          <h3>Your customers pulls for this week:</h3>
          <p>Total books pulled: {weeksBooks.length}</p>
          <p>Expected income from pulls: ${expectedIncome}</p>
        </div>
      )}
      <h3>Upcoming FOCs. Last chance!</h3>
      <SearchDisplay
        query={focComics}
        maxPages={maxPages}
        onPageChange={pageChange}
        defaultPage={currentPage}
      />
    </div>
  );
}

export default Home;
