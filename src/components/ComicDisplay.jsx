import { useContext } from "react";
import { UserContext, TaxRates, ConversionRate } from "../Contexts";
import { NavLink } from "react-router-dom";


export function calcWeek (date) {
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() - dateObject.getDay())
    dateObject.setHours(0, 0, 0, 0);
    const dateTimestamp = dateObject.getTime();
    return dateTimestamp;
    }

function ComicsDisplay (props) {
    const { user } = useContext(UserContext);
    const targetWeek = props.date;
    const { taxRates } = useContext(TaxRates);
    const { conversion } = useContext(ConversionRate);

    const weeksPulls = user.pulls.filter(pull => calcWeek(pull.Release) === targetWeek);

    const totalCost = () => {
        const productSorted = weeksPulls.reduce((acc, product) => {
            const productType = product.ProductType;
            if (!acc[productType]) {
                acc[productType] = [];
            }
            acc[productType].push(product)
            return acc;
        }, {});

        let total = 0;

        Object.keys(productSorted).forEach((type) => {
            let taxRate = 1;
            if (taxRates[type]) {
                taxRate = (taxRates[type] * 0.01) + 1;
            }
            console.log('Tax rate: ', taxRate);
            productSorted[type].forEach((book) => {
                total += parseFloat(book.MSRP.replace('$', '')) * conversion * taxRate;
            })
        })
        console.log(productSorted, total);
        return total.toFixed(2);

    }

    return (
        <div className="bookDisplay">
            <div className="imageContainer">
                {weeksPulls.map((book) => <NavLink to="/bookpage"state={{ itemCode: book.ItemCode }} key={book.ItemCode}><img src={book.ImageURL} alt="Comic Cover" /></NavLink>)}
            </div>
            <p>Your expected total this week: ${totalCost()}</p>
        </div>
    )
}

export default ComicsDisplay;