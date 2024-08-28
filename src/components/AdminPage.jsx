import { useContext, useState, useRef } from "react";
import { StoreInformation, ComicList, TaxRates, ConversionRate, SeriesContext} from "../Contexts";
import ExcelJS from 'exceljs';
import { xlsxToObjects, doublesCheck, bookSort, seriesDoubleCheck } from "./BackendFunctions";


const AdminPage = () => {
    const { storeInfo, setStoreInfo } = useContext(StoreInformation);
    const [ file, setFile ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ email, setEmail ] = useState('');
    const { comics, setComics } = useContext(ComicList);
    const [ uploadMessage, setUploadMessage] = useState('');
    const inputRef = useRef();

    const { series, setSeries } = useContext(SeriesContext);

    //Hand importing excel sheets
    const fileChange = (event) => {
        setFile(event.target.files[0])
    }
    const handleImport = (event) => {
        event.preventDefault();
    
        const reader = new FileReader();
    
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const workbook = new ExcelJS.Workbook();
            try {
            await workbook.xlsx.load(arrayBuffer); 
            }
            catch (error){
                console.log(error);
                setUploadMessage(`There was a problem with the upload`);
                setTimeout(() => {
                    setUploadMessage('')
                }, 10000);
                return;
            }
            
            workbook.removeWorksheet(2); //Clear useless sheets and rows
            workbook.worksheets[0].spliceRows(1, 1);

            const worksheetName = workbook.worksheets[0].name;
            const firstCut = worksheetName.indexOf('(') + 1;
            const secondCut = worksheetName.indexOf(' ', firstCut);
            const publisherName = worksheetName.slice(firstCut, secondCut).toLocaleLowerCase();
            const capitalName = publisherName.charAt(0).toLocaleUpperCase() + publisherName.slice(1);

            const { newBooks, seriesList } = xlsxToObjects(workbook, capitalName);
            const updatedList = doublesCheck(newBooks, comics);
            const sortedList = bookSort(newBooks.concat(updatedList));
            setComics(sortedList);

            const updatedSeries = seriesDoubleCheck(seriesList, series);
            setSeries(updatedSeries);

        }
        try {
            reader.readAsArrayBuffer(file); 
        }
        catch(error) {
            console.log(error);
            setUploadMessage(`There was a problem with the upload`);
            setTimeout(() => {
                setUploadMessage('')
            }, 10000);
            return;
        }
        
        inputRef.current.value = '';
        setUploadMessage('Uploaded!');
        setTimeout(() => {
            setUploadMessage(' ')
        }, 2000);
    }

    // Store info change
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

    // Tax rate functions
    const productTypes = ['Hardcover', 'Omnibus', 'Trade Paperback', 'Comic', 'Box Set', 'Graphic Novel', 'Poster', 'Incentive'];
    const [ product, setProduct ] = useState('Hardcover');
    const [ rate, setRate ] = useState('');
    const { taxRates, setTaxRates } = useContext(TaxRates);

    const updateRates = (e) => {
        e.preventDefault();
        setTaxRates(prev => ({
            ...prev,
            [product]: rate,
        }));
        setRate('');
    }

    // Conversion rate
    const { conversion, setConversion } = useContext(ConversionRate);
    
    const changeConversion = (e) => {
        setConversion(e.target.value);
    }

    return (
        <div className="adminPage pageDisplay">
            <h1>Store Admin</h1>
            <div className="fullscreenDiv">
                <h3>Import Universal Files</h3>
                <div className="fullscreenFlex" id="fileImport">
                    <form onSubmit={handleImport} >
                        <input type="file" onChange={fileChange} ref={inputRef}/>
                        <input type="submit" value="Upload" />
                    </form>
                    <p id="uploadMessage">{ uploadMessage }</p>
                </div>
            </div>
            <div className="fullscreenFlex">
                <div className="fullscreenDiv">
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
                </div>
                <div className="fullscreenDiv">
                    <h3>Set Tax Rate</h3>
                    <ul>
                        {taxRates && Object.keys(taxRates).map((key, index) => {
                            return <li key={index}>{ key }: { taxRates[key] }%</li>
                        })}
                    </ul>
                    <form onSubmit={(e) => {updateRates(e)}}>
                        <select onChange={(e) => {setProduct(e.target.value)}}>
                            {productTypes.map((type, index) => {
                                return <option key={index} value={ type }>{ type }</option>
                            })}
                        </select>
                        <div className="taxRateDiv">
                            <input type="number" onChange={(e) => {setRate(e.target.value)}} value={rate}/><p>%</p>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                    <h3>Set Coversion Rate</h3>
                    <label htmlFor="conversionInput">Conversion rate from USD: </label>
                    <input type="number" id="conversionInput" onChange={(e) => changeConversion(e)}/>
                    <p>Current conversion: { conversion }</p> 
                </div>
            </div>
            <button onClick={() => {console.log(series)}}>Push Me</button>
        </div>
    )
}
export default AdminPage;