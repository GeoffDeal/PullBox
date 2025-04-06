import { useEffect, useState } from "react";
import WeekSelect from "./WeekSelect";
import { handleTitle, findSundays } from "../utils/utilityFunctions.js";
import ShopSubTable from "./ShopSubTable";
import ExcelJS from "exceljs";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api.js";

const ShopPulls = () => {
  // const { customers } = useContext(CustomersContext);
  // const [pulls, setPulls] = useState([]);
  // const [weeksPulls, setWeeksPulls] = useState();
  const [sortBy, setSortBy] = useState({
    az: "ascending",
    type: "Publisher",
  });
  const [sortedPulls, setSortedPulls] = useState();
  // const defaultTimestamp = () => {
  //   const now = new Date();
  //   const lastSunday = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate()
  //   );
  //   lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
  //   return calcWeek(lastSunday);
  // };
  const { lastSunday } = findSundays();
  const [queryConditions, setQueryConditions] = useState({
    dateType: "release",
    date: lastSunday,
  });
  const [customerAmounts, setCustomerAmounts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const getPulls = async () => {
      try {
        const params = { [queryConditions.dateType]: queryConditions.date };
        const res = await api.get("/pulls/getweekspulls", { params: params });

        if (!cancelled) {
          const pullsList = res.data;
          //Combine multiples
          const combinedBooks = [];
          const customerPulls = {};
          if (pullsList && pullsList.length > 0) {
            pullsList.forEach((book) => {
              if (!combinedBooks.some((product) => product.ID === book.ID)) {
                book.totalAmount = book.amount;
                customerPulls[book.ID] = [
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
                  (comic) => comic.ID === book.ID
                );
                comic.totalAmount += book.amount;
                customerPulls[book.ID].push({
                  name: book.userName,
                  boxNumber: book.userBoxNumber,
                  amount: book.amount,
                  pullDate: book.pullDate,
                });
              }
            });
          }
          setSortedPulls(combinedBooks);
          setCustomerAmounts(customerPulls);
        }
      } catch (err) {
        toast.error(`Problem fetching pulls: ${err.message}`);
        console.error(err);
      }
    };
    getPulls();
    return () => {
      cancelled = true;
    };
  }, [queryConditions]);

  // useEffect(() => {
  //   let totalPulls = [];
  //   customers.forEach((customer) => {
  //     const customerPulls = customer.pulls;
  //     totalPulls = totalPulls.concat(customerPulls);
  //   });
  //   setPulls(totalPulls);
  // }, [customers]);

  // useEffect(() => {
  //   const weeksBooks = pulls.filter((book) => {
  //     return (
  //       calcWeek(
  //         sortConditions.dateType === "release" ? book.Release : book.FOCDueDate
  //       ) === sortConditions.timestamp
  //     );
  //   });
  //   setWeeksPulls(weeksBooks);
  // }, [pulls, sortConditions]);

  // useEffect(() => {
  //   if (weeksPulls && weeksPulls.length > 0) {
  //     const bookList = JSON.parse(JSON.stringify(weeksPulls));

  // const combinedBooks = [];
  // bookList.forEach((book) => {
  //   //Combine multiples
  //   if (!combinedBooks.some((comic) => comic.Sku === book.Sku)) {
  //     book.Customer.Quantity = book["Qty.Ord.OnTime"];
  //     book.customersList = [book.Customer];
  //     combinedBooks.push(book);
  //   } else {
  //     const comic = combinedBooks.find((comic) => comic.Sku === book.Sku);
  //     comic["Qty.Ord.OnTime"] =
  //       comic["Qty.Ord.OnTime"] + book["Qty.Ord.OnTime"];
  //     book.Customer.Quantity = book["Qty.Ord.OnTime"];
  //     comic.customersList.push(book.Customer);
  //   }
  // });
  //     combinedBooks.sort((a, b) => {
  //       if (a[sortBy.type] < b[sortBy.type]) {
  //         return sortBy.sort === "ascending" ? -1 : 1;
  //       }
  //       if (a[sortBy.type] > b[sortBy.type]) {
  //         return sortBy.sort === "ascending" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //     setSortedPulls(combinedBooks);
  //   } else {
  //     setSortedPulls([]);
  //   }
  // }, [weeksPulls, sortBy, sortConditions]);

  //Sort functions

  const toggleAscending = () => {
    setSortBy((prev) => ({
      ...prev,
      az: prev.az === "ascending" ? "descending" : "ascending",
    }));
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
      ? setSortBy((prev) => ({
          ...prev,
          type: "Publisher",
        }))
      : toggleAscending();
  };
  const sortTitle = () => {
    sortBy.type !== "ProductName"
      ? setSortBy((prev) => ({
          ...prev,
          type: "ProductName",
        }))
      : toggleAscending();
  };

  // Create excel sheet and populate pulls

  async function createExcel() {
    const pulledPublishers = new Set(sortedPulls.map((book) => book.Publisher));

    for (const pub of pulledPublishers) {
      const pubSorted = sortedPulls.filter((book) => book.Publisher === pub);

      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Heroes&Hobbies";
      workbook.created = new Date();

      const sheet = workbook.addWorksheet("Order Form");
      sheet.columns = [
        { header: "Sku", key: "sku", width: 60 },
        { header: "Quantity", key: "quantity", width: 20 },
      ];
      pubSorted.forEach((book) => {
        sheet.addRow([book.Sku, book["Qty.Ord.OnTime"]]);
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
      const fileName = "heroesorderform" + date + pub + ".xlsx";
      let buffer;
      try {
        buffer = await workbook.xlsx.writeBuffer();
      } catch (error) {
        console.log(error.message);
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
                      to="/bookpage"
                      state={{ productId: book.ID }}
                      key={book.ID}
                      className={"bookNav"}
                    >
                      {handleTitle(book.ProductName)}
                    </NavLink>
                  </td>
                  <td>{book.Variant} </td>
                  <td>
                    <ShopSubTable customers={customerAmounts[book.ID]} />
                  </td>
                  <td className="centeredCell">{book.totalAmount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {queryConditions.dateType === "foc" && (
        <button className="goldButton" onClick={() => createExcel()}>
          Export Pulls
        </button>
      )}
    </div>
  );
};

export default ShopPulls;
