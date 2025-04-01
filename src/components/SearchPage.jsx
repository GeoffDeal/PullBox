import SearchDisplay from "./SearchDisplay";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedInput = useCallback(
    debounce((string) => {
      if (string.length > 2) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("query", string);
        setSearchParams(newParams);
      }
    }, 500),
    [searchParams, setSearchParams]
  );
  function handleInput(event) {
    setInputValue(event.target.value);
    const string = event.target.value.toLocaleLowerCase();
    debouncedInput(string);
  }
  useEffect(() => {
    return () => debouncedInput.cancel();
  }, [debouncedInput]);

  return (
    <div className="pageDisplay searchPage">
      <h1>Find Comics:</h1>
      <input
        type="text"
        value={inputValue}
        placeholder="Search..."
        className="searchBar"
        onChange={handleInput}
      />
      <SearchDisplay />
    </div>
  );
}

export default SearchPage;
