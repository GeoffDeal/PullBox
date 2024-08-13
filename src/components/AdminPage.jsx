import { useContext, useState, useRef, useSyncExternalStore } from "react";
import { StoreInformation, ComicList} from "../Contexts";
import ExcelJS from 'exceljs';
import { xlsxToObjects, doublesCheck } from "./BackendFunctions";


const AdminPage = () => {
    const { storeInfo, setStoreInfo } = useContext(StoreInformation);
    const [ file, setFile ] = useState('');
    const [workbook, setWorkbook] = useState();
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ email, setEmail ] = useState('');
    const { comics, setComics } = useContext(ComicList);
    const [ uploaded, setUploaded] = useState(false);
    const inputRef = useRef();

    const fileChange = (event) => {
        setFile(event.target.files[0])
    }
    const handleImport = (event) => {
        event.preventDefault();
    
    
        const getWorkbook = () => {
            const reader = new FileReader();
        
            reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(arrayBuffer);

                workbook.removeWorksheet(2); //Clear useless sheets and rows
                workbook.worksheets[0].spliceRows(1, 1);

                const worksheetName = workbook.worksheets[0].name;
                const firstCut = worksheetName.indexOf('(') + 1;
                const secondCut = worksheetName.indexOf(' ', firstCut);
                const publisherName = worksheetName.slice(firstCut, secondCut).toLocaleLowerCase();
                const capitalName = publisherName.charAt(0).toLocaleUpperCase() + publisherName.slice(1);

                const newBooks = xlsxToObjects(workbook, capitalName);
                const updatedList = doublesCheck(newBooks, comics);
                setComics([
                    ...updatedList,
                    ...newBooks
                ]);
            }
            reader.readAsArrayBuffer(file);
        }
        getWorkbook();
        inputRef.current.value = '';
        setUploaded(true);
        setTimeout(() => {
            setUploaded(false)
        }, 3000);
    }

    const phoneChange = (e) => {
        setPhone(e.target.value);
    }
    const addressChange = (e) => {
        setAddress(e.target.value);
    }
    const emailChange = (e) => {
        setEmail(e.target.value);
    }
    const storeUpdate = (e) => {
        e.preventDefault();
        setStoreInfo((prev) => {
            return {
                ...prev,
                ...(phone && { phone }),
                ...(address && { address }),
                ...(email && { email }),
            }
        })
    }

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
            <h3>Import Universal Files</h3>
            <form onSubmit={handleImport}>
                <input type="file" onChange={fileChange} ref={inputRef}/>
                <input type="submit" value="Upload" />
            </form>
            {uploaded && <p>Uploaded!</p>}
            <h3>Change Store Info</h3>
                <form onSubmit={storeUpdate}>
                    <label htmlFor="phoneInput">Phone: </label>
                    <input 
                        id="phoneInput"
                        type="tel"
                        onChange={phoneChange}
                    /> <br />
                    <label htmlFor="addressInput">Address: </label>
                    <input 
                        id="addressInput"
                        type="text"
                        onChange={addressChange}
                    /> <br />
                    <label htmlFor="emailInput">Email: </label>
                    <input 
                        id="emailInput"
                        type="text"
                        onChange={emailChange}
                    /> <br />
                    <button type="submit">Update</button>
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