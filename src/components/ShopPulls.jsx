import { useContext, useEffect, useState } from "react";
import { CustomersContext } from "../Contexts";
import WeekSelect from "./WeekSelect";
import { calcWeek } from "./ComicDisplay";
import { handleTitle } from "./SearchDisplay";
import ShopSubTable from "./ShopSubTable";

const ShopPulls = () => {
    const { customers } = useContext(CustomersContext);
    const [ pulls, setPulls ] = useState([]);
    const [ weeksPulls, setWeeksPulls ] = useState();
    const [ sortBy, setSortBy ] = useState({
        az: 'ascending',
        type: 'Publisher'
    });
    const [ sortedPulls, setSortedPulls ] = useState();
    const defaultTimestamp = () => {
        const now = new Date();
        const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
        return calcWeek(lastSunday);
    }
    const [ sortConditions, setSortConditions ] = useState({
        dateType: 'release',
        timestamp: defaultTimestamp()
    });

    useEffect(() => {
        let totalPulls = [];
        customers.forEach(customer => {
            const customerPulls = customer.pulls;
            totalPulls = totalPulls.concat(customerPulls);
            })
        setPulls(totalPulls);
    }, [customers])
    
    useEffect(() => {
        const weeksBooks = pulls.filter(book => {
            return calcWeek(sortConditions.dateType === 'release' ? book.Release : book.FOCDueDate) === sortConditions.timestamp;
        })
        setWeeksPulls(weeksBooks);
    }, [pulls, sortConditions])


    useEffect(() => {

        if (weeksPulls && weeksPulls.length > 0) {
            const bookList = JSON.parse(JSON.stringify(weeksPulls));

            const combinedBooks = [];
            bookList.forEach(book => { //Combine multiples
                if (!combinedBooks.some(comic => comic.Sku === book.Sku)) {
                    book.Customer.Quantity = book["Qty.Ord.OnTime"];
                    book.customersList = [book.Customer];
                    combinedBooks.push(book);
                } else {
                    const comic = combinedBooks.find(comic => comic.Sku === book.Sku);
                    comic["Qty.Ord.OnTime"] = comic["Qty.Ord.OnTime"] + book["Qty.Ord.OnTime"];
                    book.Customer.Quantity = book["Qty.Ord.OnTime"];
                    comic.customersList.push(book.Customer);

                }
            })
            combinedBooks.sort((a, b) => {
                if (a[sortBy.type] < b[sortBy.type]) {
                    return sortBy.sort === 'ascending' ? -1 : 1;
                }
                if (a[sortBy.type] > b[sortBy.type]) {
                    return sortBy.sort === 'ascending' ? 1 : -1;
                }
                return 0;
            })
            setSortedPulls(combinedBooks);
        }
        else {setSortedPulls([])};
    }, [weeksPulls, sortBy, sortConditions])

    const toggleAscending = () => {
        setSortBy(prev => ({
            ...prev,
            az: prev.az === 'ascending' ? 'descending' : 'ascending'
        }))
    }
    const changeDateType = (e) => {
        setSortConditions(prev => ({
            ...prev,
            dateType: e.target.value
        }))
    }
    const changeDate = (date) => {
        setSortConditions(prev => ({
            ...prev, 
            timestamp: date
        }))
    }

    const sortPublisher = () => {
        sortBy.type !== 'Publisher' ? setSortBy(prev =>({
            ...prev,
            type: 'Publisher'
        })) 
        : toggleAscending();
    }
    const sortTitle = () => {
        sortBy.type !== 'ProductName' ? setSortBy(prev => ({
            ...prev,
            type: 'ProductName'
        })) 
        : toggleAscending();
    }

    return(
        <div className="shopPulls">
            <h1>Customer Pulls</h1>

            <select onChange={(e) => changeDateType(e)}>
                <option value="release">Release Date</option>
                <option value="foc">FOC Date</option>
            </select>
            <WeekSelect onDataPass={changeDate} />
            <table className="pullsTable">
                <thead>
                    <tr>
                        <th><button onClick={sortPublisher}>Publisher</button></th>
                        <th><button onClick={sortTitle}>Title</button></th>
                        <th>Customers</th>
                        <th>Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPulls && sortedPulls.map((book, index) => {
                        return <tr key={ index }>
                            <td className="centeredCell">{ book.Publisher }</td>
                            <td>{ handleTitle(book.ProductName) }</td>
                            <td><ShopSubTable customers={ book.customersList } /></td>
                            <td className="centeredCell">{ book["Qty.Ord.OnTime"] }</td>

                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShopPulls;