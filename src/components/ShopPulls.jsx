import { useContext, useEffect, useState } from "react";
import { CustomersContext } from "../Contexts";
import WeekSelect from "./WeekSelect";
import { calcWeek } from "./ComicDisplay";
import { handleTitle } from "./SearchDisplay";

const ShopPulls = () => {
    const { customers } = useContext(CustomersContext);
    const [ pulls, setPulls ] = useState([]);
    const [ weeksPulls, setWeeksPulls ] = useState();
    const [ sortBy, setSortBy ] = useState('Publisher');
    const [ sortedPulls, setSortedPulls ] = useState();
    const [ sortConditions, setSortConditions ] = useState({
        date: 'release',
        sort: 'ascending'
    });

    useEffect(() => {
        let totalPulls = [];
        customers.forEach(customer => {
            const customerPulls = customer.pulls;
            customerPulls.forEach(book => {
                book.Customer = [customer.name];
            }
            )
            totalPulls = totalPulls.concat(customerPulls);
            })
        setPulls(totalPulls);
    }, [customers])
    
    const weekChange = (date) => {
        if (sortConditions.date === 'release') {  //ternary conditional to clean up
            const weeksBooks = pulls.filter(book => calcWeek(book.Release) === date )
            setWeeksPulls(weeksBooks);
        } else {
            const weeksBooks = pulls.filter(book => calcWeek(book.FOCDueDate) === date )
            setWeeksPulls(weeksBooks);
        }

    }
    useEffect(() => {
        const now = new Date();
        const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
        const timestamp = calcWeek(lastSunday);
        weekChange(timestamp);
    }, [pulls]);

    useEffect(() => {

        if (weeksPulls && weeksPulls.length > 0) {
            const bookList = JSON.parse(JSON.stringify(weeksPulls));

            const combinedBooks = [];
            bookList.forEach(book => { //Combine multiples
                if (!combinedBooks.some(comic => comic.Sku === book.Sku)) {
                    combinedBooks.push(book);
                } else {
                    const comic = combinedBooks.find(comic => comic.Sku === book.Sku);
                    comic["Qty.Ord.OnTime"] = comic["Qty.Ord.OnTime"] + book["Qty.Ord.OnTime"];

                    const customers = [...book.Customer, ...comic.Customer]; //Combines customer lists
                    comic.Customer = customers;
                }
            })
            combinedBooks.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return sortConditions.sort === 'ascending' ? -1 : 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return sortConditions.sort === 'ascending' ? 1 : -1;
                }
                return 0;
            })
            setSortedPulls(combinedBooks);
        }
        else {setSortedPulls([])};
    }, [weeksPulls, sortBy, sortConditions])

    const toggleAscending = () => {
        setSortConditions(prev => ({
            ...prev,
            sort: prev.sort === 'ascending' ? 'descending' : 'ascending'
        }))
    }

    const sortPublisher = () => {
        sortBy !== 'Publisher' ? setSortBy('Publisher') : toggleAscending();
    }
    const sortTitle = () => {
        sortBy !== 'ProductName' ? setSortBy('ProductName') : toggleAscending();
    }

    return(
        <div className="shopPulls">
            <h1>Customer Pulls</h1>

            <WeekSelect onDataPass={weekChange} />
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
                    {sortedPulls && sortedPulls.map((book) => {
                        return <tr key={ book.Sku }>
                            <td className="centeredCell">{ book.Publisher }</td>
                            <td>{ handleTitle(book.ProductName) }</td>
                            <td>{ book.Customer.map((customer, index) => (
                                <span key={index}>
                                    {customer} 
                                    <br />
                                </span>))}
                            </td>
                            <td className="centeredCell">{ book["Qty.Ord.OnTime"] }</td>

                        </tr>
                    })}
                </tbody>
            </table>
            <button onClick={() => {console.log(sortedPulls)}}>Push Me</button>
        </div>
    )
}

export default ShopPulls;