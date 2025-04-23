import { useEffect, useContext, useState, useRef } from "react";
import { PriceAdjustments } from "../Contexts";
import { toast } from "react-toastify";
import api from "../api/api.js";
import { useUser } from "@clerk/clerk-react";

const AdminPage = () => {
  const { user, isLoaded } = useUser();

  const [files, setFiles] = useState("");
  const inputRef = useRef();
  const [storeInfo, setStoreInfo] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { priceAdjustments, setPriceAdjustments } =
    useContext(PriceAdjustments);
  const [product, setProduct] = useState("Hardcover");
  const [rate, setRate] = useState("");
  const [conversion, setConversion] = useState("");

  // Fetch store info

  useEffect(() => {
    let cancelled = false;

    const getInfo = async () => {
      try {
        const res = await api.get("/storeinfo");
        if (!cancelled) setStoreInfo(res.data);
      } catch (err) {
        console.error(err);
        toast.error(`Problem fetching info: ${err.message}`);
      }
    };
    getInfo();
    return () => {
      cancelled = true;
    };
  }, []);

  //Handle importing excel sheets

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

  const contactChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const storeUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/storeinfo/updateinfo", storeInfo);
      toast.success("Store info updated!");
    } catch (err) {
      console.error(err);
      toast.error(`Problem updating info: ${err.message}`);
    }
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

  const updateRates = async (e) => {
    e.preventDefault();
    const oldAdustments = structuredClone(priceAdjustments);
    const newAdjustments = {
      ...oldAdustments,
      taxRates: { ...oldAdustments.taxRates, [product]: rate },
    };
    try {
      setPriceAdjustments(newAdjustments);
      setRate("");
      await api.put("/priceadjustments/updateadjustments", newAdjustments);
    } catch (err) {
      console.error(err);
      toast.error(`Problem updating rates: ${err.message}`);
      setPriceAdjustments(oldAdustments);
    }
  };

  const updateConversion = async (e) => {
    e.preventDefault();
    const oldAdustments = structuredClone(priceAdjustments);
    const newAdjustments = {
      ...oldAdustments,
      conversion: conversion,
    };
    try {
      setPriceAdjustments(newAdjustments);
      setConversion("");
      await api.put("/priceadjustments/updateadjustments", newAdjustments);
    } catch (err) {
      console.error(err);
      toast.error(`Problem updating conversion: ${err.message}`);
      setPriceAdjustments(oldAdustments);
    }
  };

  // Auth admin check
  if (!isLoaded) return <div className="loadingText">Loading...</div>;

  const role = user?.publicMetadata?.role;
  if (role !== "admin")
    return <div className="adminWarning">Admin privledges required</div>;

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
              <input
                id="phoneInput"
                type="tel"
                name="phone"
                value={storeInfo?.phone ? storeInfo.phone : ""}
                onChange={contactChange}
              />
            </div>
            <div className="infoBlock">
              <label htmlFor="addressInput">Address: </label>
              <input
                id="addressInput"
                type="text"
                name="address"
                value={storeInfo?.address ? storeInfo.address : ""}
                onChange={contactChange}
              />
            </div>
            <div className="infoBlock">
              <label htmlFor="emailInput">Email: </label>
              <input
                id="emailInput"
                type="text"
                name="email"
                value={storeInfo?.email ? storeInfo.email : ""}
                onChange={contactChange}
              />
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
                    value={
                      storeInfo?.hours[openKey] ? storeInfo?.hours[openKey] : ""
                    }
                    type="time"
                    onChange={hourChange}
                  />
                  <label htmlFor={closeKey}>Close: </label>
                  <input
                    id={closeKey}
                    value={
                      storeInfo?.hours[closeKey]
                        ? storeInfo?.hours[closeKey]
                        : ""
                    }
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
            {priceAdjustments &&
              Object.keys(priceAdjustments.taxRates).map((key, index) => {
                return (
                  <li key={index}>
                    {key}: {priceAdjustments.taxRates[key]}%
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
            <button type="submit">Update Tax Rates</button>
          </form>
          <h3>Set Coversion Rate</h3>
          <form onSubmit={updateConversion}>
            <label htmlFor="conversionInput">Conversion rate from USD: </label>
            <input
              type="number"
              id="conversionInput"
              onChange={(e) => setConversion(e.target.value)}
              value={conversion}
            />
            <button type="submit">Update Conversion Rate</button>
          </form>
          <p>Current conversion: {priceAdjustments.conversion}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
