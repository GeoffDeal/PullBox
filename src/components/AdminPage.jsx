import { useContext } from "react";
import { StoreInformation } from "../Contexts";


const AdminPage = () => {
    const { storeInfo, setStoreInfo } = useContext(StoreInformation);

    const hourChange = (event) => {
        const { id, value } = event.target;
        setStoreInfo(prev => ({
            ...prev,
            hours: {
                ...prev.hours,
                [id]: value,
            }
        }));
    }
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

    return (
        <div className="adminPage">
            <h1>Store Admin</h1>
            <h3>Import Files</h3>
            <form>
                <input type="file" />
                <input type="submit" value="Upload" />
            </form>
            <h3>Change Store Hours</h3>
            <form className="timeForm">
                {weekdays.map(day => {
                    const openKey = day.toLowerCase() + 'open';
                    const closeKey = day.toLowerCase() + 'close';
                    return(
                        <div key={day} className="dayTimes">
                            <p className="dayName">{day}</p>
                            <label htmlFor={openKey}>Open: </label>
                            <input 
                                id={openKey} 
                                value={storeInfo.hours[openKey]} 
                                type="time"
                                onChange={hourChange} />
                            <label htmlFor={closeKey}>Close: </label>
                            <input 
                                id={closeKey}
                                value={storeInfo.hours[closeKey]} 
                                type="time"
                                onChange={hourChange} />
                        </div>
                    )
                })}
            </form>
            <h3>Set Tax Rate</h3>
            <form>
                <input type="number" />
            </form>

        </div>
    )
}
export default AdminPage;