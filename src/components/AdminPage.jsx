import { useContext, useState } from "react";
import { StoreInformation } from "../Contexts";
import ExcelJS from 'exceljs';
import { xlsxToObjects } from "./BackendFunctions";


const AdminPage = () => {
    const { storeInfo, setStoreInfo } = useContext(StoreInformation);
    const [file, setFile] = useState();
    const [workbook, setWorkbook] = useState();

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
                setWorkbook(workbook);
                cleanSheet(workbook);
            }
            reader.readAsArrayBuffer(file);

        }
        const cleanSheet = (workbook) => {
            workbook.removeWorksheet(2);
            workbook.worksheets[0].spliceRows(1, 1);
            setWorkbook(workbook);
        xlsxToObjects(workbook);

        }
    
        getWorkbook();
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
                <input type="file" onChange={fileChange}/>
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