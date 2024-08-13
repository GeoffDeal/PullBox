import { useContext } from "react";
import { StoreInformation } from "../Contexts";


const StoreInfo = () => {
    const { storeInfo } = useContext(StoreInformation);

    return (
        <div className="storeInfoPage">
            <h1>Store Information</h1>
            {storeInfo.phone && <p>Phone number: { storeInfo.phone }</p>}
            {storeInfo.address && <p>Address: { storeInfo.address }</p>}
            {storeInfo.email && <p>Email: { storeInfo.email }</p>}
            <h3>Store Hours</h3>
            <p>Sunday: {storeInfo.hours.sundayopen ? `${storeInfo.hours.sundayopen} - ${storeInfo.hours.sundayclose}` : 'Closed'}</p>
            <p>Monday: {storeInfo.hours.mondayopen ? `${storeInfo.hours.mondayopen} - ${storeInfo.hours.mondayclose}` : 'Closed'}</p>
            <p>Tuesday: {storeInfo.hours.tuesdayopen ? `${storeInfo.hours.tuesdayopen} - ${storeInfo.hours.tuesdayclose}` : 'Closed'}</p>
            <p>Wednesday: {storeInfo.hours.wednesdayopen ? `${storeInfo.hours.wednesdayopen} - ${storeInfo.hours.wednesdayclose}` : 'Closed'}</p>
            <p>Thursday: {storeInfo.hours.thursdayopen ? `${storeInfo.hours.thursdayopen} - ${storeInfo.hours.thursdayclose}` : 'Closed'}</p>
            <p>Friday: {storeInfo.hours.fridayopen ? `${storeInfo.hours.fridayopen} - ${storeInfo.hours.fridayclose}` : 'Closed'}</p>
            <p>Saturday: {storeInfo.hours.saturdayopen ? `${storeInfo.hours.saturdayopen} - ${storeInfo.hours.saturdayclose}` : 'Closed'}</p>
        </div>
    )
}
export default StoreInfo;