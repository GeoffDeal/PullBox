import { useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import WeekSelect from "./WeekSelect";
import { toast } from "react-toastify";
import api from "../api/api";

const BrowsePage = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("en-CA");
  });
  const [timeframe, setTimeframe] = useState("release");
  const [product, setProduct] = useState("Comic");
  const [publisher, setPublisher] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [productList, setProductList] = useState([]);
  const itemsPerPage = 20;
  useEffect(() => {
    let cancelled = false;
    async function getBrowsed() {
      try {
        const res = await api.get("/products/browse", {
          params: {
            week: timeframe,
            date: date,
            product: product,
            publisher: publisher,
            limit: itemsPerPage,
            page: currentPage,
          },
        });
        if (!cancelled) {
          setProductList(res.data.data);
          setMaxPages(res.data.pages);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error retrieving products");
      }
    }
    getBrowsed();
    return () => {
      cancelled = true;
    };
  }, [timeframe, date, product, publisher, currentPage]);

  const pageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const weekChange = (day) => {
    const formattedDay = day.toLocaleDateString("en-CA");
    setDate(formattedDay);
  };

  return (
    <div className="pageDisplay">
      <h1>Browse</h1>
      <p>Browse by: </p>
      <select
        value={timeframe}
        onChange={(event) => {
          setTimeframe(event.target.value);
        }}
      >
        <option value="release">Release Date</option>
        <option value="foc">Final Order Date</option>
        <option value="none">None</option>
      </select>

      <select
        value={product}
        onChange={(event) => {
          setProduct(event.target.value);
        }}
      >
        <option value={"Comic"}>Comics</option>
        <option value={"Trade Paperback"}>Trade Paperbacks</option>
        <option value={"Hardcover"}>Hardcovers</option>
        <option value={"Graphic Novel"}>Graphic Novels</option>
        <option value={"Poster"}>Posters</option>
        <option value={"All"}>All</option>
      </select>
      <select
        value={publisher}
        onChange={(event) => {
          setPublisher(event.target.value);
        }}
      >
        <option value={"All"}>All</option>
        <option value={"Marvel"}>Marvel</option>
        <option value={"Dc"}>DC</option>
        <option value={"Image"}>Image</option>
        <option value={"Dark Horse"}> Dark Horse</option>
        <option value={"Idw"}>IDW</option>
        <option value={"Boom!"}>BOOM!</option>
        <option value={"Dynamite"}>Dynamite</option>
      </select>
      {timeframe !== "none" && (
        <WeekSelect onDataPass={weekChange} defaultTime={date} />
      )}
      <SearchDisplay
        query={productList}
        maxPages={maxPages}
        onPageChange={pageChange}
        defaultPage={currentPage}
      />
    </div>
  );
};

export default BrowsePage;
