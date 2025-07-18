import { useCallback, useEffect, useState } from "react";
import WeekSelect from "./WeekSelect";
import { findSundays } from "../utils/utilityFunctions.js";
import ShopSubTable from "./ShopSubTable";
import ExcelJS from "exceljs";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api.js";
import { useUser } from "@clerk/clerk-react";
import { useAuthHeader } from "../utils/authHeaderSetter.js";

const ShopPulls = () => {
  const { user, isLoaded } = useUser();
  const getHeaders = useAuthHeader();
  const [sortBy, setSortBy] = useState({
    az: "ascending",
    type: "Publisher",
  });
  const [pullData, setPullData] = useState();
  const [sortedPulls, setSortedPulls] = useState();

  const { lastSunday } = findSundays();
  const [queryConditions, setQueryConditions] = useState({
    dateType: "release",
    date: lastSunday,
  });
  const [customerAmounts, setCustomerAmounts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Sort functions
  const sortPulls = useCallback(
    (productArray, sortConfig = sortBy) => {
      if (productArray && productArray.length > 0) {
        const sortedArray = [...productArray];
        sortedArray.sort((a, b) => {
          if (a[sortConfig.type] < b[sortConfig.type]) {
            return sortConfig.az === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.type] > b[sortConfig.type]) {
            return sortConfig.az === "ascending" ? 1 : -1;
          }
          return 0;
        });
        return sortedArray;
      } else {
        return [];
      }
    },
    [sortBy]
  );

  const toggleAscending = () => {
    setSortBy((prev) => {
      const newOrder = prev.az === "ascending" ? "descending" : "ascending";
      const newSortBy = { ...prev, az: newOrder };
      const newSorted = sortPulls(pullData, newSortBy);
      setSortedPulls(newSorted);
      return newSortBy;
    });
  };
  const changeDateType = (e) => {
    setQueryConditions((prev) => ({
      ...prev,
      dateType: e.target.value,
    }));
  };
  const changeDate = (date) => {
    setQueryConditions((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const sortPublisher = () => {
    sortBy.type !== "Publisher"
      ? setSortBy((prev) => {
          const newSortBy = { ...prev, type: "Publisher" };
          const newSorted = sortPulls(pullData, newSortBy);
          setSortedPulls(newSorted);
          return newSortBy;
        })
      : toggleAscending();
  };
  const sortTitle = () => {
    sortBy.type !== "ProductName"
      ? setSortBy((prev) => {
          const newSortBy = { ...prev, type: "ProductName" };
          const newSorted = sortPulls(pullData, newSortBy);
          setSortedPulls(newSorted);
          return newSortBy;
        })
      : toggleAscending();
  };

  // Fetch data
  useEffect(() => {
    let cancelled = false;
    const getPulls = async () => {
      try {
        const headers = await getHeaders();
        const params = { [queryConditions.dateType]: queryConditions.date };
        const res = await api.get("/pulls/getweekspulls", { params, headers });

        if (!cancelled) {
          const pullsList = res.data;
          //Combine multiples
          const combinedBooks = [];
          const customerPulls = {};
          if (pullsList && pullsList.length > 0) {
            pullsList.forEach((book) => {
              if (
                !combinedBooks.some(
                  (product) => product.productId === book.productId
                )
              ) {
                book.totalAmount = book.amount;
                customerPulls[book.productId] = [
                  {
                    name: book.userName,
                    boxNumber: book.userBoxNumber,
                    amount: book.amount,
                    pullDate: book.pullDate,
                  },
                ];
                combinedBooks.push(book);
              } else {
                const comic = combinedBooks.find(
                  (comic) => comic.productId === book.productId
                );
                comic.totalAmount += book.amount;
                customerPulls[book.productId].push({
                  name: book.userName,
                  boxNumber: book.userBoxNumber,
                  amount: book.amount,
                  pullDate: book.pullDate,
                });
              }
            });
          }
          setPullData(combinedBooks);
          setSortedPulls(combinedBooks);
          setCustomerAmounts(customerPulls);
        }
      } catch (err) {
        toast.error(`Problem fetching pulls: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPulls();
    return () => {
      cancelled = true;
    };
  }, [queryConditions, getHeaders]);

  // Create excel sheet and populate pulls

  async function generateForms() {
    const pulledPublishers = new Set(sortedPulls.map((book) => book.Publisher));

    for (const pub of pulledPublishers) {
      const pubSortedComics = sortedPulls.filter(
        (book) => book.Publisher === pub && book.ProductType === "Comic"
      );
      const pubSortedIncentives = sortedPulls.filter(
        (incentive) =>
          incentive.Publisher === pub && incentive.ProductType === "Incentive"
      );

      if (pubSortedComics.length > 0) createForm(pubSortedComics, pub);
      if (pubSortedIncentives.length > 0) createForm(pubSortedIncentives, pub);
    }
  }

  async function createForm(bookArray, publisher) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Heroes&Hobbies";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Order Form");
    sheet.columns = [
      { header: "Sku", key: "sku", width: 60 },
      { header: "Quantity", key: "quantity", width: 20 },
    ];
    bookArray.forEach((book) => {
      sheet.addRow([book.Sku, book.totalAmount]);
    });

    const cells = ["A1", "B1"];
    cells.forEach((cellName) => {
      const cell = sheet.getCell(cellName);
      cell.font = { color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167b8" },
      };
    });

    const date = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    const products =
      bookArray[0].ProductType === "Incentive" ? "Incentives" : "Products";
    const fileName = "heroesorderform" + date + publisher + products + ".xlsx";
    let buffer;
    try {
      buffer = await workbook.xlsx.writeBuffer();
    } catch (error) {
      console.error(error.message);
      toast.error(`Problem creating form: ${error.message}`);
      return;
    }
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Auth admin check
  if (!isLoaded) return <div className="loadingText">Loading...</div>;

  const role = user?.publicMetadata?.role;
  if (role !== "admin")
    return <div className="adminWarning">Admin privledges required</div>;

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
    <div className="shopPulls pageDisplay">
      <h1>Customer Pulls</h1>

      <select onChange={(e) => changeDateType(e)}>
        <option value="release">Release Date</option>
        <option value="foc">FOC Date</option>
      </select>
      <WeekSelect onDataPass={changeDate} />
      <table className="pullsTable">
        <thead>
          <tr>
            <th>
              <button onClick={sortPublisher}>Publisher</button>
            </th>
            <th>
              <button onClick={sortTitle}>Title</button>
            </th>
            <th>Variant #</th>
            <th>Customers</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sortedPulls &&
            sortedPulls.map((book, index) => {
              return (
                <tr key={index}>
                  <td className="centeredCell">{book.Publisher}</td>
                  <td>
                    <NavLink
                      to={`/bookpage/${book.productId}`}
                      key={book.productId}
                      className={"bookNav"}
                    >
                      {book.ProductName}
                    </NavLink>
                  </td>
                  <td>{book.Variant} </td>
                  <td>
                    <ShopSubTable
                      customers={customerAmounts[book.productId]}
                      foc={book.FOCDueDate}
                    />
                  </td>
                  <td className="centeredCell">{book.totalAmount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {queryConditions.dateType === "foc" && (
        <button className="goldButton" onClick={() => generateForms()}>
          Export Pulls
        </button>
      )}
    </div>
  );
};

export default ShopPulls;
