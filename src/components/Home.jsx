import { ComicList, UserContext, CustomersContext, ConversionRate } from "../Contexts";
import ComicsDisplay, { calcWeek } from "./ComicDisplay";
import { useContext, useEffect, useState } from "react";
import SearchDisplay from "./SearchDisplay";
import { useSearchParams } from "react-router-dom";

function Home () {
    const { user } = useContext(UserContext);
    const { comics } = useContext(ComicList);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const now = new Date();
    const lastSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    const nextSunday = new Date(lastSunday)
    nextSunday.setDate(lastSunday.getDate() + 7);

    const focComics = comics.filter(book => calcWeek(book.FOCDueDate) === calcWeek(nextSunday));

    // Week's total for shop

    const { customers } = useContext(CustomersContext);
    const { conversion } = useContext(ConversionRate);
    const [ weeksBooks, setWeeksBooks ] = useState([]);
    const [ expectedIncome, setExpectedIncome ] = useState();

    useEffect(() => {
        let pulls = [];
        customers.forEach(customer => {
            const customersWeek = customer.pulls.filter((book) => calcWeek(book.Release) === lastSunday.getTime());
            pulls = pulls.concat(customersWeek);
        })
        setWeeksBooks(pulls);
    }, []);
    useEffect(() => {
        let priceTotal = 0;
        weeksBooks.forEach((book) =>{
            const cadPrice = parseFloat(book.MSRP.replace('$', '')) * conversion;
            priceTotal += cadPrice;
        })
        const totalRounded = priceTotal.toFixed(2);
        setExpectedIncome(totalRounded);
    }, [weeksBooks])

    const pageChange = (pageNumber) => {
        const page = searchParams.get('page');
        if (Number(page) !== pageNumber) {
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('page', pageNumber);
            return updatedParams;
        });
        }
    }


    return (
        <div className="pageDisplay">
            <h1>Welcome {user.name}</h1>
            {user.customer ?
            <div>
                <h3>Your pulls for this week:</h3>
                <ComicsDisplay date={ lastSunday.getTime()} />
            </div> :
            <div>
                <h3>Your customers' pulls for this week:</h3>
                <p>Total books pulled: { weeksBooks.length }</p>
                <p>Expected income from pulls: ${ expectedIncome }</p>
            </div>}
            <h3>Upcoming FOCs. Last chance!</h3>
            <SearchDisplay query={ focComics } onPageChange={pageChange} defaultPage={searchParams.get('page')} />

        </div>
    )
};

export default Home;