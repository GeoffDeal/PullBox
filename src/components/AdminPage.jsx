import { useContext, useState, useRef } from "react";
import { StoreInformation, TaxRates, ConversionRate } from "../Contexts";
import { toast } from "react-toastify";
import api from "../api/api.js";

const AdminPage = () => {
  const { storeInfo, setStoreInfo } = useContext(StoreInformation);
  const [files, setFiles] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef();

  //Handle importing excel sheets

  const [isUploading, setIsUploading] = useState(false);
  const fileChange = (event) => {
    setFiles(event.target.files);
  };
  const handleImport = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    try {
      if (files.length < 1) throw new Error("Please choose a file");
      const filesArray = [...files];
      const formData = new FormData();
      filesArray.forEach((file) => {
        formData.append("file", file);
      });
      await api.post("/products/upload", formData);
      toast.success(`Upload Successful!`);
      inputRef.current.value = null;
      setFiles("");
    } catch (err) {
      toast.error(`Problem with upload: ${err.message}`);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Store info change
  const phoneChange = (e) => {
    setPhone(e.target.value);
  };
  const addressChange = (e) => {
    setAddress(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const storeUpdate = (e) => {
    e.preventDefault();
    setStoreInfo((prev) => {
      return {
        ...prev,
        ...(phone && { phone }),
        ...(address && { address }),
        ...(email && { email }),
      };
    });
  };

  const hourChange = (event) => {
    const { id, value } = event.target;
    setStoreInfo((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [id]: value,
      },
    }));
  };
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Tax rate functions
  const productTypes = [
    "Hardcover",
    "Omnibus",
    "Trade Paperback",
    "Comic",
    "Box Set",
    "Graphic Novel",
    "Poster",
    "Incentive",
  ];
  const [product, setProduct] = useState("Hardcover");
  const [rate, setRate] = useState("");
  const { taxRates, setTaxRates } = useContext(TaxRates);

  const updateRates = (e) => {
    e.preventDefault();
    setTaxRates((prev) => ({
      ...prev,
      [product]: rate,
    }));
    setRate("");
  };

  // Conversion rate
  const { conversion, setConversion } = useContext(ConversionRate);

  const changeConversion = (e) => {
    setConversion(e.target.value);
  };

  return (
    <div className="adminPage pageDisplay">
      <h1>Store Admin</h1>
      <div className="fullscreenDiv">
        <h3>Import Universal Files</h3>
        <div className="fullscreenFlex" id="fileImport">
          <form onSubmit={handleImport}>
            <input
              type="file"
              onChange={fileChange}
              disabled={isUploading}
              ref={inputRef}
              multiple
            />
            <input
              type="submit"
              disabled={isUploading}
              value={isUploading ? "Uploading..." : "Upload"}
            />
          </form>
        </div>
      </div>
      <div className="fullscreenFlex">
        <div className="fullscreenDiv">
          <h3>Change Store Info</h3>
          <form onSubmit={storeUpdate} id="storeInfoForm">
            <div className="infoBlock">
              <label htmlFor="phoneInput">Phone: </label>
              <input id="phoneInput" type="tel" onChange={phoneChange} />
            </div>
            <div className="infoBlock">
              <label htmlFor="addressInput">Address: </label>
              <input id="addressInput" type="text" onChange={addressChange} />
            </div>
            <div className="infoBlock">
              <label htmlFor="emailInput">Email: </label>
              <input id="emailInput" type="text" onChange={emailChange} />
            </div>
            <button type="submit">Update</button>
          </form>
          <h3>Change Store Hours</h3>
          <form className="timeForm">
            {weekdays.map((day) => {
              const openKey = day.toLowerCase() + "open";
              const closeKey = day.toLowerCase() + "close";
              return (
                <div key={day} className="dayTimes">
                  <p className="dayName">{day}</p>
                  <label htmlFor={openKey}>Open: </label>
                  <input
                    id={openKey}
                    value={storeInfo.hours[openKey]}
                    type="time"
                    onChange={hourChange}
                  />
                  <label htmlFor={closeKey}>Close: </label>
                  <input
                    id={closeKey}
                    value={storeInfo.hours[closeKey]}
                    type="time"
                    onChange={hourChange}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div className="fullscreenDiv">
          <h3>Set Tax Rate</h3>
          <ul>
            {taxRates &&
              Object.keys(taxRates).map((key, index) => {
                return (
                  <li key={index}>
                    {key}: {taxRates[key]}%
                  </li>
                );
              })}
          </ul>
          <form
            onSubmit={(e) => {
              updateRates(e);
            }}
          >
            <select
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            >
              {productTypes.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
            <div className="taxRateDiv">
              <input
                type="number"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                value={rate}
              />
              <p>%</p>
            </div>
            <button type="submit">Update</button>
          </form>
          <h3>Set Coversion Rate</h3>
          <label htmlFor="conversionInput">Conversion rate from USD: </label>
          <input
            type="number"
            id="conversionInput"
            onChange={(e) => changeConversion(e)}
          />
          <p>Current conversion: {conversion}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
