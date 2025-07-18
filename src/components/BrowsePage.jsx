import { useSearchParams } from "react-router-dom";
import SearchDisplay from "./SearchDisplay";
import WeekSelect from "./WeekSelect";
import { publisherOptions } from "../utils/utilityFunctions";

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const weekChange = (day) => {
    if (searchParams.get("date") !== day) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("date", day);
      setSearchParams(newParams);
    }
  };
  const paramChange = (event, param) => {
    const value = event.target.value;
    if (searchParams.get(param) !== value) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(param, value);
      setSearchParams(newParams);
    }
  };

  return (
    <div className="pageDisplay">
      <h1>Browse</h1>
      <p>Browse by: </p>
      <select
        value={searchParams.get("timeframe") || "release"}
        onChange={(event) => {
          paramChange(event, "timeframe");
        }}
      >
        <option value="release">Release Date</option>
        <option value="foc">Final Order Date</option>
      </select>

      <select
        value={searchParams.get("product") || "Comic"}
        onChange={(event) => {
          paramChange(event, "product");
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
        value={searchParams.get("publisher") || "All"}
        onChange={(event) => {
          paramChange(event, "publisher");
        }}
      >
        <option value={"All"}>All</option>
        {publisherOptions.map((publisher, index) => (
          <option key={index} value={publisher}>
            {publisher}
          </option>
        ))}
      </select>
      {searchParams.get("timeframe") !== "none" && (
        <WeekSelect
          onDataPass={weekChange}
          defaultTime={searchParams.get("date")}
        />
      )}
      <SearchDisplay />
    </div>
  );
};

export default BrowsePage;
