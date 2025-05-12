import { createContext, useState, useEffect } from "react";
import api from "./api/api.js";

export const PriceAdjustments = createContext();

const Contexts = ({ children }) => {
  const [priceAdjustments, setPriceAdjustments] = useState();
  useEffect(() => {
    let cancelled = false;

    const fetchAdjustments = async () => {
      try {
        const res = await api.get("/priceadjustments");
        if (!cancelled) setPriceAdjustments(res.data);
      } catch (err) {
        console.error("Error fetching adjustments", err);
      }
    };

    fetchAdjustments();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PriceAdjustments.Provider
      value={{ priceAdjustments, setPriceAdjustments }}
    >
      {children}
    </PriceAdjustments.Provider>
  );
};

export default Contexts;
